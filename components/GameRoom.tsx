import React, { useState } from 'react';
import { GameState, GamePhase, User, SinType } from '../types';
import { Backend } from '../services/mockBackend';
import { SIN_ICONS, SIN_DESCRIPTIONS, SIN_STYLES } from '../constants';

interface Props {
  gameState: GameState;
  user: User;
}

export default function GameRoom({ gameState, user }: Props) {
  const isConductor = user.nickname === gameState.players.find(p => p.isConductor)?.nickname;
  const me = gameState.players.find(p => p.nickname === user.nickname);
  const [selectedSin, setSelectedSin] = useState<SinType | null>(null);
  const [secretWord, setSecretWord] = useState('');
  const [hintMode, setHintMode] = useState(false);

  const handleSubmitMemory = () => {
    if (selectedSin && secretWord) {
      Backend.submitMemory(user.nickname, selectedSin, secretWord);
      setSecretWord('');
      setSelectedSin(null);
    }
  };

  const handleTakeDebt = (sin: SinType) => {
    Backend.takeDebt(user.nickname, sin);
    setHintMode(false);
  };

  const handleToggleTimer = () => {
    Backend.toggleTimer();
  }

  // Helper to calculate progress
  const progressPercent = Math.min((gameState.totalRevealed / (gameState.players.length * 7 * 0.8)) * 100, 100);

  // === RENDER HELPERS ===

  // 1. Lobby Waiting Room
  if (gameState.phase === GamePhase.LOBBY) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="border-4 border-steam-brass p-10 bg-steam-charcoal text-center max-w-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <h2 className="text-3xl font-rye text-steam-brass mb-4">Waiting for Departure</h2>
          <div className="text-6xl tracking-[1em] text-steam-verdigris font-mono mb-8 pl-8 drop-shadow-[0_0_10px_rgba(99,209,204,0.4)]">
            {gameState.code}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            {gameState.players.map(p => (
              <div key={p.nickname} className="flex items-center gap-2 text-xl font-playfair border-b border-white/20 pb-2">
                <span>{p.isConductor ? '🚂' : '🧳'}</span>
                <span className={p.nickname === user.nickname ? 'text-steam-rustLight font-bold' : 'text-steam-parchment'}>
                  {p.nickname}
                </span>
              </div>
            ))}
          </div>
          {isConductor ? (
            <button 
                onClick={() => Backend.startGame()}
                className="w-full py-4 bg-steam-rust text-white font-cinzel font-bold text-xl hover:bg-steam-rustLight transition-colors shadow-lg border border-steam-rustLight/50"
                disabled={gameState.players.length < 1} 
            >
              BLOW THE WHISTLE
            </button>
          ) : (
            <p className="animate-pulse text-steam-parchmentDim font-bold">Waiting for the Conductor...</p>
          )}
        </div>
      </div>
    );
  }

  // 2. End Game Screen
  if (gameState.phase === GamePhase.GAME_END) {
      let title = "OBLIVION";
      let desc = "The train arrives at a station that does not exist. You fade into the fog.";
      const score = gameState.totalRevealed;
      if (score > 15) { title = "SALVATION"; desc = "The sun breaks through the smog. You step onto the platform, lighter than air."; }
      else if (score > 5) { title = "PURGATORY"; desc = "The journey loops. You must ride again."; }

      return (
          <div className="flex flex-col items-center justify-center flex-grow text-center animate-fade-in">
              <h1 className="text-7xl font-rye text-steam-rustLight mb-6 drop-shadow-lg">{title}</h1>
              <p className="text-2xl font-playfair text-steam-parchment max-w-2xl mb-8 leading-relaxed italic">{desc}</p>
              <div className="text-4xl font-mono text-steam-verdigris mb-10 bg-black/40 px-8 py-4 border border-steam-brassDark">
                  SECRETS REVEALED: {score}
              </div>
              <p className="text-sm text-steam-parchment font-bold tracking-widest uppercase">Check the Station Log for records.</p>
          </div>
      )
  }

  // 3. Main Game Dashboard
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow h-full">
      
      {/* Left Column: Stats & Rules */}
      <div className="lg:col-span-1 bg-steam-charcoal/70 border-r border-steam-brassDark p-4 flex flex-col gap-4 overflow-y-auto scrollbar-steam shadow-xl">
        
        {/* Timer Gauge & Controls */}
        <div className="flex flex-col items-center shrink-0">
          
          {/* Game Ticket Code Display */}
          <div className="mb-2 bg-black/40 px-3 py-1 border border-steam-brass/30 rounded text-center">
            <span className="text-[10px] text-steam-brass uppercase tracking-tighter block opacity-70">Ticket Code</span>
            <span className="text-xl font-mono text-steam-verdigris font-bold tracking-widest drop-shadow-[0_0_5px_rgba(99,209,204,0.4)]">
                {gameState.code}
            </span>
          </div>

          <div className="glass-gauge rounded-full w-28 h-28 mx-auto flex flex-col items-center justify-center relative">
            <div className="text-2xl font-mono text-steam-verdigris drop-shadow-[0_0_8px_rgba(99,209,204,0.6)] font-bold">
              {Math.floor(gameState.timerSeconds / 60)}:{(gameState.timerSeconds % 60).toString().padStart(2, '0')}
            </div>
            <span className="text-[10px] text-steam-brass uppercase mt-1 tracking-widest font-bold">Pressure</span>
          </div>

          <div className="mt-2 text-steam-rustLight font-rye text-xl tracking-widest">
              WAGON {gameState.currentRound} <span className="text-steam-parchment font-sans font-bold text-sm">/ 7</span>
          </div>
          
          {isConductor && gameState.phase === GamePhase.ROLEPLAY && (
            <div className="flex flex-col gap-2 mt-2 w-full px-2">
                <button 
                  onClick={handleToggleTimer}
                  className="text-[10px] tracking-widest px-3 py-1.5 border-2 border-steam-brass text-steam-brass hover:bg-steam-brass hover:text-black transition-colors w-full uppercase font-bold"
                >
                  {gameState.timerActive ? 'PAUSE GEARS' : 'RESUME STEAM'}
                </button>
                <button 
                  onClick={() => Backend.skipTimer()}
                  className="text-[10px] tracking-widest px-3 py-1.5 border-2 border-red-700 text-red-400 hover:bg-red-900 hover:text-white transition-colors w-full uppercase font-bold"
                >
                  NEXT WAGON
                </button>
            </div>
          )}
        </div>

        {/* Rules Section */}
        <div className="bg-black/40 border border-steam-brassDark p-3 shrink-0 shadow-inner">
          <h3 className="text-steam-brass font-cinzel text-xs border-b border-steam-brassDark mb-2 pb-1 tracking-widest font-bold">
            RULES OF THE RAILS
          </h3>
          <div className="space-y-3 text-[11px] font-playfair leading-tight text-steam-parchment">
            <p><strong className="text-steam-verdigris font-cinzel font-bold uppercase">Imagine:</strong> Pick a Sin and write a Secret Word matching the Wagon.</p>
            <p><strong className="text-steam-verdigris font-cinzel font-bold uppercase">Roleplay:</strong> Chat to guide others to say your word. Never say it yourself!</p>
            <p><strong className="text-steam-verdigris font-cinzel font-bold uppercase">Reveal:</strong> Your card opens only if another player speaks your word.</p>
            <p><strong className="text-steam-verdigris font-cinzel font-bold uppercase">Risk:</strong> Flip a Sin card to give a hint.</p>
            <p className="italic pl-2 border-l-2 border-steam-rust/80 text-steam-parchmentDim font-medium">Cost: You must handle 2 words next round.</p>
            <p><strong className="text-steam-verdigris font-cinzel font-bold uppercase">Survive:</strong> Reveal enough memories in 7 rounds to escape Purgatory.</p>
          </div>
        </div>

        {/* Manifest */}
        <div className="bg-black/50 p-4 border border-steam-brassDark flex-grow overflow-y-auto scrollbar-steam shadow-inner">
          <h3 className="text-steam-rustLight font-cinzel border-b border-steam-rust/60 mb-3 font-bold uppercase tracking-widest">Manifest</h3>
          <ul className="space-y-4">
            {gameState.players.map(p => {
                const pendingCards = gameState.memoryCards.filter(m => m.playerNickname === p.nickname && !m.revealed).length;
                return (
                    <li key={p.nickname} className="flex justify-between items-center text-sm border-b border-white/5 pb-1">
                        <span className={p.nickname === user.nickname ? "text-steam-verdigris font-bold underline" : p.burdened ? "text-red-400 font-black" : "text-steam-parchment font-medium"}>
                            {p.nickname} {p.burdened && "💀"}
                        </span>
                        <div className="flex gap-2 text-xs">
                            <span className="text-steam-brass font-bold" title="Revealed">👁 {p.revealedCount}</span>
                            <span className="text-steam-verdigris font-bold" title="Hidden">🔒 {pendingCards}</span>
                        </div>
                    </li>
                )
            })}
          </ul>
        </div>
      </div>

      {/* Center: Wagon & Sins */}
      <div className="lg:col-span-2 flex flex-col gap-6 relative">
        {/* Progress Bar Top */}
        <div className="w-full h-2.5 bg-steam-dark border border-steam-brassDark rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-steam-verdigris shadow-[0_0_10px_rgba(99,209,204,0.6)] transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* Wagon Window Frame */}
        <div className="relative group">
            <div className="bg-[#2d2d2d] border-[4px] border-steam-brassDark rounded-t-[40px] p-2 shadow-[0_15px_40px_rgba(0,0,0,0.9)] relative z-10">
                
                {/* Decorative Rivets */}
                <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-steam-brass to-steam-brassDark shadow-[1px_1px_2px_rgba(0,0,0,0.8)] z-20 border border-black/80"></div>
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-steam-brass to-steam-brassDark shadow-[1px_1px_2px_rgba(0,0,0,0.8)] z-20 border border-black/80"></div>

                {/* Inner Bezel */}
                <div className="bg-black border-[3px] border-steam-brass/60 rounded-t-[32px] overflow-hidden relative shadow-[inset_0_0_50px_rgba(0,0,0,1)] h-full">
                    
                    {/* The Viewport - Set to aspect-video for 16:9 ratio */}
                    <div className="relative aspect-video overflow-hidden border-b-8 border-steam-brassDark/80 w-full">
                        <img 
                            src={gameState.currentWagon?.imageUrl} 
                            className="w-full h-full object-cover opacity-90 sepia-[0.2] transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-100" 
                            alt="Wagon View"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/hsimpson/pattern-library/master/patterns/scratches/scratches.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                    </div>

                    {/* Plaque Area */}
                    <div className="bg-gradient-to-b from-[#1e1a15] to-black p-5 text-center border-t border-steam-brass/40 relative">
                        <h2 className="text-2xl font-rye text-steam-brass mb-2 tracking-widest drop-shadow-md">
                            {gameState.currentWagon?.title}
                        </h2>
                        <p className="text-steam-parchment font-playfair italic text-sm mb-4 px-8 leading-relaxed">
                            "{gameState.currentWagon?.description}"
                        </p>
                        
                        <div className="inline-block bg-[#0a0a0c] text-steam-parchment border-2 border-steam-brassDark p-4 font-cinzel text-sm shadow-[inset_0_0_20px_rgba(0,0,0,1)] max-w-lg mx-auto relative font-medium">
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-steam-brass"></div>
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-steam-brass"></div>
                            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-steam-brass"></div>
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-steam-brass"></div>
                            {gameState.currentWagon?.question}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Sin Tracker */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.entries(gameState.activeSins).map(([key, active]) => {
                const sin = key as SinType;
                const isDisabled = !active;
                
                return (
                    <button 
                        key={sin}
                        disabled={isDisabled || (!hintMode && gameState.phase !== GamePhase.INPUT)}
                        onClick={() => hintMode ? handleTakeDebt(sin) : setSelectedSin(sin)}
                        className={`
                            relative h-24 md:h-24 lg:h-20 flex items-center justify-center border-2 transition-all duration-300 group overflow-hidden shadow-md
                            ${isDisabled ? 'opacity-20 grayscale border-stone-800 bg-black cursor-not-allowed' : 'border-red-900 bg-black/80 hover:bg-black hover:border-red-600'}
                            ${selectedSin === sin ? 'border-steam-verdigris bg-steam-verdigris/20 shadow-[0_0_15px_rgba(99,209,204,0.5)] scale-105 z-20' : ''}
                            ${hintMode && active ? 'animate-pulse border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.7)] cursor-pointer' : ''}
                        `}
                        title={SIN_DESCRIPTIONS[sin]}
                    >
                        <span className={`
                            font-rye text-[10px] md:text-[10px] lg:text-[11px] 
                            tracking-wider uppercase transition-transform font-bold
                            ${isDisabled ? 'text-gray-600' : 'text-steam-rustLight drop-shadow-[0_0_4px_rgba(183,65,14,0.8)]'}
                        `}>
                            {SIN_ICONS[sin]}
                        </span>
                    </button>
                );
            })}
        </div>

        {/* Revealed Cards Display */}
        {gameState.phase === GamePhase.ROLEPLAY && (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto max-h-60 scrollbar-steam p-4 bg-black/60 border-2 border-steam-brassDark shadow-inner">
                {gameState.memoryCards.map(card => {
                    const isMine = card.playerNickname === user.nickname;
                    return (
                        <div 
                            key={card.id} 
                            onClick={() => Backend.revealCard(card.id)}
                            className={`
                                p-3 border-2 text-xs cursor-pointer transition-all shadow-sm relative overflow-hidden group
                                ${card.revealed 
                                    ? 'bg-steam-parchment text-black border-steam-brass font-bold' 
                                    : isMine 
                                        ? 'bg-steam-verdigris/10 border-steam-verdigris animate-pulse-slow shadow-[0_0_10px_rgba(99,209,204,0.3)]' 
                                        : 'bg-steam-dark/80 text-steam-verdigris border-steam-verdigris/40 border-dashed hover:border-steam-verdigris hover:bg-black'
                                }
                            `}
                        >
                            {card.revealed ? (
                                <>
                                    <span className={`block border-b border-black/10 mb-1 text-[10px] uppercase ${isMine ? 'text-steam-rust' : 'text-black/60'}`}>
                                        {isMine ? 'Your Confession' : card.playerNickname}
                                    </span>
                                    <span className="italic font-playfair text-base block py-1">"{card.word}"</span> 
                                    <span className="text-[10px] opacity-70 uppercase tracking-tighter bg-black/5 px-1 rounded">{card.sin}</span>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-2 text-center">
                                    {isMine ? (
                                        <>
                                            <span className="text-[9px] uppercase tracking-widest text-steam-verdigris mb-1 font-black">Your Secret</span>
                                            <span className="text-steam-parchment font-bold text-xs">({card.sin})</span>
                                        </>
                                    ) : (
                                        <span className="opacity-50 tracking-widest uppercase font-bold text-[10px]">Reveal Secret</span>
                                    )}
                                </div>
                            )}
                            {/* Visual Hint for owner */}
                            {!card.revealed && isMine && (
                                <div className="absolute top-0 right-0 w-2 h-2 bg-steam-verdigris rounded-bl-full"></div>
                            )}
                        </div>
                    )
                })}
             </div>
        )}

      </div>

      {/* Right Column: Player Input */}
      <div className="lg:col-span-1 bg-steam-charcoal border-l-2 border-steam-brassDark p-6 flex flex-col justify-between shadow-2xl z-20">
        
        {gameState.phase === GamePhase.INPUT && (
            <div className="space-y-4 animate-fade-in">
                <h3 className="text-steam-brass font-cinzel text-center font-bold tracking-widest text-lg uppercase border-b border-steam-brassDark/40 pb-2">
                    Confess {me?.burdened ? "(2 Required)" : "(1 Required)"}
                </h3>
                
                {!selectedSin ? (
                    <div className="text-center p-6 border-2 border-dashed border-steam-brassDark/40 bg-black/20 rounded-lg">
                        <p className="text-sm text-steam-parchment italic leading-relaxed">Select a <span className="text-steam-rustLight font-bold">Sin</span> from the tracker to begin your confession.</p>
                    </div>
                ) : (
                    <>
                        <div className={`text-center text-2xl font-rye mb-2 drop-shadow-lg ${SIN_STYLES[selectedSin]}`}>{SIN_ICONS[selectedSin]}</div>
                        <input 
                            type="text" 
                            maxLength={20}
                            placeholder="Your Secret Word..." 
                            value={secretWord}
                            onChange={(e) => setSecretWord(e.target.value)}
                            className="w-full bg-steam-parchment text-black p-3 font-playfair border-4 border-steam-brassDark focus:border-steam-rustLight outline-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] font-bold text-lg"
                        />
                        <button 
                            onClick={handleSubmitMemory}
                            disabled={!secretWord}
                            className="w-full py-3 bg-steam-brassDark text-steam-parchment font-bold border-2 border-steam-brass hover:bg-steam-brass hover:text-black transition-all shadow-lg disabled:opacity-40 uppercase tracking-widest"
                        >
                            Seal Memory
                        </button>
                    </>
                )}
                 <div className="text-sm text-center mt-6 p-2 bg-black/40 border border-steam-brassDark font-bold text-steam-verdigris">
                     SUBMITTED: {gameState.memoryCards.filter(m => m.playerNickname === user.nickname).length}
                 </div>
            </div>
        )}

        {gameState.phase === GamePhase.ROLEPLAY && (
            <div className="space-y-6 text-center animate-fade-in">
                <p className="text-base italic text-steam-parchment font-medium leading-relaxed bg-black/30 p-4 border border-steam-brassDark/30">
                    "Weave your secret words into the conversation. Listen to others. Survival depends on insight."
                </p>
                
                {!me?.burdened && !hintMode && (
                    <button 
                        onClick={() => setHintMode(true)}
                        className="w-full py-8 bg-gradient-to-b from-red-800 to-black border-4 border-double border-red-500 text-red-50 font-rye text-xl shadow-[0_0_25px_rgba(255,0,0,0.5)] hover:scale-105 transition-transform active:scale-95 leading-tight group"
                    >
                        <span className="block text-red-400 text-xs mb-1 group-hover:text-red-300">EMERGENCY PROTOCOL</span>
                        PULL BRAKE<br/>(TAKE DEBT)
                    </button>
                )}
                {hintMode && (
                    <div className="bg-red-950 border-2 border-red-500 p-5 shadow-[0_0_30px_rgba(255,0,0,0.6)] animate-pulse">
                        <p className="text-sm font-bold text-red-100 mb-4 uppercase tracking-tighter">Select an active SIN icon on the dashboard to disable it. You will carry the burden next round.</p>
                        <button onClick={() => setHintMode(false)} className="px-6 py-2 bg-black text-white border border-white/40 font-bold uppercase text-xs hover:bg-white hover:text-black transition-colors">Cancel</button>
                    </div>
                )}
            </div>
        )}

        {gameState.phase === GamePhase.ROUND_END && isConductor && (
             <button 
                onClick={() => Backend.nextRound()}
                className="w-full py-5 mt-auto bg-steam-verdigris text-black font-cinzel font-black border-4 border-steam-verdigris shadow-[0_0_20px_rgba(99,209,204,0.4)] hover:bg-white transition-all uppercase tracking-[0.2em] text-lg"
            >
                {gameState.currentRound === 7 ? "TERMINUS REACHED" : "NEXT WAGON"}
            </button>
        )}
         {gameState.phase === GamePhase.ROUND_END && !isConductor && (
            <div className="mt-auto text-center text-steam-parchment font-bold animate-pulse bg-black/40 p-4 border border-steam-verdigris/30 uppercase tracking-widest text-xs">
                The Conductor is validating tickets...
            </div>
         )}

      </div>
    </div>
  );
}