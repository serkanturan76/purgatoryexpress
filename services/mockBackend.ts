import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { User, GameState, GamePhase, Player, SinType, StationLogEntry } from '../types';
import { WAGON_CARDS, ADMIN_EMAIL, ADMIN_PASS } from '../constants';

// Netlify değişkenlerini daha esnek bir şekilde okuyalım
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

// Eğer bilgiler eksikse, uygulamanın çökmesini engellemek için boş bir client oluşturmuyoruz, 
// onun yerine her fonksiyonda kontrol edeceğiz.
let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

type Listener = () => void;
let listeners: Listener[] = [];
let activeGame: GameState | null = null;
let subscription: any = null;

const checkInit = () => {
  if (!supabase) {
    throw new Error("Supabase bağlantısı kurulamadı. Lütfen Netlify üzerindeki VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ayarlarını kontrol edin.");
  }
};

export const Backend = {
  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
      if (subscription) {
        subscription.unsubscribe();
        subscription = null;
      }
    };
  },

  emitChange: () => listeners.forEach(l => l()),

  // --- Yeni Veritabanı Tabanlı Auth ---
  register: async (email: string, pass: string, nickname: string) => {
    checkInit();
    // Önce bu email var mı kontrol et
    const { data: existing } = await supabase.from('passenger_profiles').select('email').eq('email', email).single();
    if (existing) throw new Error("Bu bilet (email) zaten kullanılmış.");

    const newUser = {
      email,
      password: pass,
      nickname,
      is_admin: email === ADMIN_EMAIL
    };

    const { error } = await supabase.from('passenger_profiles').insert([newUser]);
    if (error) throw new Error("Kayıt sırasında tren arızalandı: " + error.message);

    localStorage.setItem('purgatory_user', JSON.stringify({ email, nickname, isAdmin: newUser.is_admin }));
    return { email, nickname, isAdmin: newUser.is_admin };
  },

  login: async (email: string, pass: string) => {
    checkInit();
    const { data, error } = await supabase
      .from('passenger_profiles')
      .select('*')
      .eq('email', email)
      .eq('password', pass)
      .single();

    if (error || !data) throw new Error("Geçersiz bilet bilgileri veya hatalı şifre.");

    const user = { email: data.email, nickname: data.nickname, isAdmin: data.is_admin };
    localStorage.setItem('purgatory_user', JSON.stringify(user));
    return user;
  },

  // --- Diğer Fonksiyonlar ---
  getLogs: async () => {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('logs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data.map((d: any) => ({ ...d.data, id: d.id }));
    } catch (e) {
      return [];
    }
  },

  deleteLog: async (id: string) => {
    checkInit();
    await supabase.from('logs').delete().eq('id', id);
    Backend.emitChange();
  },

  createGame: async (conductorNickname: string) => {
    checkInit();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const initialState: GameState = {
      code,
      phase: GamePhase.LOBBY,
      currentRound: 0,
      players: [{ nickname: conductorNickname, isConductor: true, revealedCount: 0, burdened: false }],
      activeSins: {
        [SinType.PRIDE]: true, [SinType.GREED]: true, [SinType.LUST]: true,
        [SinType.ENVY]: true, [SinType.GLUTTONY]: true, [SinType.WRATH]: true, [SinType.SLOTH]: true
      },
      hintedSins: [],
      currentWagon: null,
      usedWagonIds: [],
      memoryCards: [],
      timerSeconds: 300,
      timerActive: false,
      totalRevealed: 0
    };

    const { error } = await supabase.from('games').insert([{ id: code, state: initialState }]);
    if (error) throw new Error("Tren raydan çıktı: " + error.message);
    
    await Backend.watchGame(code);
    return initialState;
  },

  joinGame: async (code: string, nickname: string) => {
    checkInit();
    const { data, error } = await supabase.from('games').select('*').eq('id', code).single();
    if (error || !data) throw new Error("Tren bulunamadı veya kod hatalı.");
    
    const state = data.state as GameState;
    if (state.phase !== GamePhase.LOBBY) throw new Error("Tren çoktan kalktı.");
    
    const existing = state.players.find(p => p.nickname === nickname);
    if (!existing) {
      state.players.push({ nickname, isConductor: false, revealedCount: 0, burdened: false });
      await supabase.from('games').update({ state }).eq('id', code);
    }
    
    await Backend.watchGame(code);
    return state;
  },

  watchGame: async (code: string) => {
    if (!supabase) return;
    if (subscription) subscription.unsubscribe();
    
    const { data } = await supabase.from('games').select('*').eq('id', code).single();
    if (data) {
      activeGame = data.state;
      Backend.emitChange();
    }

    subscription = supabase
      .channel(`game_${code}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'games', filter: `id=eq.${code}` }, 
      (payload: any) => {
        activeGame = (payload.new as any).state;
        Backend.emitChange();
      })
      .subscribe();
  },

  getGameState: () => activeGame,

  updateRemoteState: async (newState: GameState) => {
    if (!activeGame || !supabase) return;
    await supabase.from('games').update({ state: newState }).eq('id', activeGame.code);
  },

  startGame: () => {
    if (!activeGame) return;
    const newState = { ...activeGame, currentRound: 1 };
    Backend.startRound(newState);
  },

  startRound: (state: GameState = activeGame!) => {
    if (!state) return;
    const pool = WAGON_CARDS.filter(card => !state.usedWagonIds.includes(card.id));
    const selectedWagon = pool[Math.floor(Math.random() * pool.length)] || WAGON_CARDS[0];

    state.currentWagon = selectedWagon;
    state.usedWagonIds.push(selectedWagon.id);
    state.memoryCards = [];
    state.phase = GamePhase.INPUT;
    state.timerSeconds = 300;
    state.timerActive = false;
    
    // Reset active sins for input phase at the start of every round
    state.activeSins = {
      [SinType.PRIDE]: true, [SinType.GREED]: true, [SinType.LUST]: true,
      [SinType.ENVY]: true, [SinType.GLUTTONY]: true, [SinType.WRATH]: true, [SinType.SLOTH]: true
    };

    Backend.updateRemoteState(state);
  },

  submitMemory: (playerNickname: string, sin: SinType, word: string) => {
    if (!activeGame) return;
    const state = { ...activeGame };
    state.memoryCards.push({
      id: Math.random().toString(36).substr(2, 9),
      playerNickname, sin, word, revealed: false
    });

    const allSubmitted = state.players.every(p => {
        const count = state.memoryCards.filter(m => m.playerNickname === p.nickname).length;
        return count >= (p.burdened ? 2 : 1);
    });

    if (allSubmitted) {
        state.players.forEach(p => p.burdened = false);
        state.phase = GamePhase.ROLEPLAY;
        state.timerActive = true;
    }
    Backend.updateRemoteState(state);
  },

  revealCard: (cardId: string) => {
      if(!activeGame) return;
      const state = { ...activeGame };
      const card = state.memoryCards.find(c => c.id === cardId);
      if(card && !card.revealed) {
          card.revealed = true;
          state.totalRevealed++;
          const p = state.players.find(pl => pl.nickname === card.playerNickname);
          if(p) p.revealedCount++;
      }
      Backend.updateRemoteState(state);
  },

  takeDebt: (playerNickname: string, sinToDisable: SinType) => {
    if (!activeGame) return;
    const state = { ...activeGame };
    
    // Disable for current round input (if any)
    state.activeSins[sinToDisable] = false;
    
    // Add to permanent hint list
    if (!state.hintedSins.includes(sinToDisable)) {
      state.hintedSins.push(sinToDisable);
    }

    const p = state.players.find(pl => pl.nickname === playerNickname);
    if (p) p.burdened = true;
    Backend.updateRemoteState(state);
  },

  tickTimer: () => {
    if (!activeGame || !activeGame.timerActive) return;
    if (activeGame.timerSeconds > 0) {
        activeGame.timerSeconds--;
        Backend.emitChange();
    } else {
        const state = { ...activeGame, timerActive: false, phase: GamePhase.ROUND_END };
        Backend.updateRemoteState(state);
    }
  },

  toggleTimer: () => {
    if (!activeGame) return;
    const state = { ...activeGame, timerActive: !activeGame.timerActive };
    Backend.updateRemoteState(state);
  },

  skipTimer: () => {
    if (!activeGame) return;
    const state = { ...activeGame, timerSeconds: 0, timerActive: false, phase: GamePhase.ROUND_END };
    Backend.updateRemoteState(state);
  },

  nextRound: () => {
    if (!activeGame) return;
    if (activeGame.currentRound >= 7) {
      Backend.endGame();
    } else {
      const state = { ...activeGame, currentRound: activeGame.currentRound + 1 };
      Backend.startRound(state);
    }
  },

  endGame: async () => {
    if (!activeGame || !supabase) return;
    const state = { ...activeGame, phase: GamePhase.GAME_END };
    
    const entry: StationLogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      playerNicknames: state.players.map(p => p.nickname),
      playerCount: state.players.length,
      scoreRatio: `${state.totalRevealed} / ${state.players.length}`
    };
    
    await supabase.from('logs').insert([{ data: entry }]);
    await Backend.updateRemoteState(state);
  },

  leaveGame: () => {
      activeGame = null;
      if (subscription) {
        subscription.unsubscribe();
        subscription = null;
      }
      Backend.emitChange();
  }
};