import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { User, GameState, GamePhase, Player, SinType, StationLogEntry } from '../types';
import { WAGON_CARDS, ADMIN_EMAIL, ADMIN_PASS } from '../constants';

// Netlify değişkenlerini okuma (Vite veya standart Node ortamı için uyumlu)
// Eğer build aşamasında hata alırsan veya Netlify'da çalışmazsa buraya direkt tırnak içinde Supabase bilgilerini de yazabilirsin.
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase bağlantı bilgileri eksik! Netlify Environment Variables ayarlarını kontrol edin.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

type Listener = () => void;
let listeners: Listener[] = [];
let activeGame: GameState | null = null;
let subscription: any = null;

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

  register: (email: string, pass: string, nickname: string) => {
    const user = { email, nickname, isAdmin: email === ADMIN_EMAIL };
    localStorage.setItem('purgatory_user', JSON.stringify(user));
    return user;
  },

  login: (email: string, pass: string) => {
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      return { email, nickname: "The Architect", isAdmin: true };
    }
    const stored = localStorage.getItem('purgatory_user');
    if (stored) {
      const u = JSON.parse(stored);
      if (u.email === email) return u;
    }
    throw new Error("Geçersiz bilet bilgileri.");
  },

  getLogs: async () => {
    try {
      const { data, error } = await supabase.from('logs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data.map(d => ({ ...d.data, id: d.id }));
    } catch (e) {
      console.error("Log hatası:", e);
      return [];
    }
  },

  deleteLog: async (id: string) => {
    await supabase.from('logs').delete().eq('id', id);
    Backend.emitChange();
  },

  createGame: async (conductorNickname: string) => {
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
    if (subscription) subscription.unsubscribe();
    
    // Mevcut durumu hemen çek
    const { data } = await supabase.from('games').select('*').eq('id', code).single();
    if (data) {
      activeGame = data.state;
      Backend.emitChange();
    }

    // Gerçek zamanlı dinlemeyi başlat
    subscription = supabase
      .channel(`game_${code}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'games', 
        filter: `id=eq.${code}` 
      }, 
      (payload) => {
        activeGame = (payload.new as any).state;
        Backend.emitChange();
      })
      .subscribe();
  },

  getGameState: () => activeGame,

  updateRemoteState: async (newState: GameState) => {
    if (!activeGame) return;
    const { error } = await supabase.from('games').update({ state: newState }).eq('id', activeGame.code);
    if (error) console.error("Güncelleme hatası:", error);
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
    state.activeSins[sinToDisable] = false;
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
    if (!activeGame) return;
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