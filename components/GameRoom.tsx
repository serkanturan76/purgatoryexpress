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
        <div className="border-4 border-steam-brass p-10 bg-steam-charcoal/90 text-center max-w-2xl w-full">
          <h2 className="text-3xl font-rye text-steam-brass mb-4">Waiting for Departure</h2>
          <div className="text-6xl tracking-[1em] text-steam-verdigris font-mono mb-8 pl-8">
            {gameState.code}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            {gameState.players.map(p => (
              <div key={p.nickname} className="flex items-center gap-2 text-xl font-playfair border-b border-white/10 pb-2">
                <span>{p.isConductor ? '🚂' : '🧳'}</span>
                <span className={p.nickname === user.nickname ? 'text-steam-rustLight' : 'text-steam-parchment'}>
                  {p.nickname}
                </span>
              </div>
            ))}
          </div>
          {isConductor ? (
            <button 
                onClick={() => Backend.startGame()}
                className="w-full py-4 bg-steam-rust text-white font-cinzel font-bold text-xl hover:bg-steam-rustLight transition-colors"
                disabled={gameState.players.length < 1} // Dev allows 1 player for testing
            >
              BLOW THE WHISTLE
            </button>
          ) : (
            <p className="animate-pulse text-steam-parchmentDim">Waiting for the Conductor...</p>
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
      // Simple logic for endings
      if (score > 15) { title = "SALVATION"; desc = "The sun breaks through the smog. You step onto the platform, lighter than air."; }
      else if (score > 5) { title = "PURGATORY"; desc = "The journey loops. You must ride again."; }

      return (
          <div className="flex flex-col items-center justify-center flex-grow text-center">
              <h1 className="text-6xl font-rye text-steam-rust mb-6">{title}</h1>
              <p className="text-2xl font-playfair text-steam-parchment max-w-2xl mb-8">{desc}</p>
              <div className="text-4xl font-mono text-steam-verdigris mb-10">
                  SECRETS REVEALED: {score}
              </div>
              <p className="text-sm text-steam-parchmentDim">Check the Station Log for records.</p>
          </div>
      )
  }

  // 3. Main Game Dashboard
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow h-full">
      
      {/* Left Column: Stats & Rules */}
      <div className="lg:col-span-1 bg-steam-charcoal/50 border-r border-steam-brassDark p-4 flex flex-col gap-4 overflow-y-auto scrollbar-steam">
        
        {/* Timer Gauge & Controls */}
        <div className="flex flex-col items-center shrink-0">
          <div className="glass-gauge rounded-full w-28 h-28 mx-auto flex flex-col items-center justify-center relative">
            <div className="text-2xl font-mono text-steam-verdigris drop-shadow-[0_0_5px_rgba(67,179,174,0.8)]">
              {Math.floor(gameState.timerSeconds / 60)}:{(gameState.timerSeconds % 60).toString().padStart(2, '0')}
            </div>
            <span className="text-[10px] text-steam-brass uppercase mt-1 tracking-widest">Pressure</span>
          </div>

          <div className="mt-2 text-steam-rust font-rye text-xl tracking-widest">
              WAGON {gameState.currentRound} <span className="text-steam-parchmentDim text-sm font-sans">/ 7</span>
          </div>
          
          {isConductor && gameState.phase === GamePhase.ROLEPLAY && (
            <div className="flex flex-col gap-2 mt-2 w-full px-2">
                <button 
                  onClick={handleToggleTimer}
                  className="text-[10px] tracking-widest px-3 py-1.5 border border-steam-brass text-steam-brass hover:bg-steam-brass hover:text-black transition-colors w-full uppercase"
                >
                  {gameState.timerActive ? 'PAUSE GEARS' : 'RESUME STEAM'}
                </button>
                <button 
                  onClick={() => Backend.skipTimer()}
                  className="text-[10px] tracking-widest px-3 py-1.5 border border-red-800 text-red-500 hover:bg-red-900 hover:text-white transition-colors w-full uppercase"
                >
                  NEXT WAGON
                </button>
            </div>
          )}
        </div>

        {/* Rules Section */}
        <div className="bg-black/30 border border-steam-brassDark p-3 shrink-0 shadow-inner">
          <h3 className="text-steam-brass font-cinzel text-xs border-b border-steam-brassDark mb-2 pb-1 tracking-widest font-bold">
            RULES OF THE RAILS
          </h3>
          <div className="space-y-2 text-[11px] font-playfair leading-tight text-steam-parchment">
            <p><strong className="text-steam-verdigris font-cinzel">IMAGINE:</strong> Pick a Sin and write a Secret Word matching the Wagon.</p>
            <p><strong className="text-steam-verdigris font-cinzel">ROLEPLAY:</strong> Chat to guide others to say your word. Never say it yourself!</p>
            <p><strong className="text-steam-verdigris font-cinzel">REVEAL:</strong> Your card opens only if another player speaks your word.</p>
            <p><strong className="text-steam-verdigris font-cinzel">RISK:</strong> Flip a Sin card to give a hint.</p>
            <p className="italic pl-2 border-l border-steam-rust/50 text-steam-parchmentDim">Cost: You must handle 2 words next round.</p>
            <p><strong className="text-steam-verdigris font-cinzel">SURVIVE:</strong> Reveal enough memories in 7 rounds to escape Purgatory.</p>
          </div>
        </div>

        {/* Manifest */}
        <div className="bg-black/40 p-4 border border-steam-brassDark flex-grow overflow-y-auto scrollbar-steam shadow-inner">
          <h3 className="text-steam-rust font-cinzel border-b border-steam-rust mb-3">Manifest</h3>
          <ul className="space-y-3">
            {gameState.players.map(p => {
                const pendingCards = gameState.memoryCards.filter(m => m.playerNickname === p.nickname && !m.revealed).length;
                return (
                    <li key={p.nickname} className="flex justify-between items-center text-sm">
                        <span className={p.burdened ? "text-red-500 font-bold" : "text-steam-parchment"}>
                            {p.nickname} {p.burdened && "💀"}
                        </span>
                        <div className="flex gap-2 text-xs">
                            <span className="text-steam-brass" title="Revealed">👁 {p.revealedCount}</span>
                            <span className="text-steam-verdigris" title="Hidden">🔒 {pendingCards}</span>
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
        <div className="w-full h-2 bg-steam-dark border border-steam-brassDark rounded-full overflow-hidden">
            <div className="h-full bg-steam-verdigris transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* Wagon Window Frame (The "Looking Out" View) */}
        <div className="relative group">
            {/* The Outer Frame Structure - Heavy Steampunk Casing */}
            <div className="bg-[#2a2a2a] border-[4px] border-steam-brassDark rounded-t-[40px] p-2 shadow-[0_10px_30px_rgba(0,0,0,1)] relative z-10 min-h-[420px]">
                
                {/* Decorative Rivets on the Outer Casing */}
                <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-steam-brass to-steam-brassDark shadow-[1px_1px_2px_rgba(0,0,0,0.8)] z-20 border border-black/80"></div>
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-steam-brass to-steam-brassDark shadow-[1px_1px_2px_rgba(0,0,0,0.8)] z-20 border border-black/80"></div>
                <div className="absolute bottom-20 left-3 w-3 h-3 rounded-full bg-steam-charcoal shadow-inner z-20 border border-steam-brassDark"></div>
                <div className="absolute bottom-20 right-3 w-3 h-3 rounded-full bg-steam-charcoal shadow-inner z-20 border border-steam-brassDark"></div>

                {/* Inner Bezel / Window Frame */}
                <div className="bg-black border-[3px] border-steam-brass rounded-t-[32px] overflow-hidden relative shadow-[inset_0_0_40px_rgba(0,0,0,1)] h-full">
                    
                    {/* The "Glass" Viewport */}
                    <div className="relative h-[300px] overflow-hidden border-b-8 border-steam-brassDark">
                        {/* The Image (The "View") */}
                        <img 
                            src={gameState.currentWagon?.imageUrl} 
                            className="w-full h-full object-cover opacity-80 sepia-[0.3] grayscale-[0.2] transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-100" 
                            alt="Wagon View"
                        />
                        
                        {/* Glass Overlay (Dirt/Reflection) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/hsimpson/pattern-library/master/patterns/scratches/scratches.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                        
                        {/* Vignette */}
                        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,1)] pointer-events-none"></div>
                    </div>

                    {/* The Brass Plaque Area */}
                    <div className="bg-gradient-to-b from-[#1a1510] to-black p-4 text-center border-t border-steam-brass/30 relative">
                        {/* Plaque Decoration Line */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-steam-brassDark to-transparent absolute top-1 left-0 opacity-50"></div>

                        <h2 className="text-xl font-rye text-steam-brass mb-2 tracking-widest drop-shadow-md">
                            {gameState.currentWagon?.title}
                        </h2>
                        <p className="text-steam-parchmentDim font-playfair italic text-sm mb-3 px-8">
                            "{gameState.currentWagon?.description}"
                        </p>
                        
                        {/* Question Box styling */}
                        <div className="inline-block bg-[#0f0f11] text-steam-parchment border border-steam-brassDark p-3 font-cinzel text-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] max-w-lg mx-auto transform rotate-0 relative">
                            {/* Small corner accents for the question box */}
                            <div className="absolute top-0 left-0 w-1 h-1 bg-steam-brass"></div>
                            <div className="absolute top-0 right-0 w-1 h-1 bg-steam-brass"></div>
                            <div className="absolute bottom-0 left-0 w-1 h-1 bg-steam-brass"></div>
                            <div className="absolute bottom-0 right-0 w-1 h-1 bg-steam-brass"></div>
                            {gameState.currentWagon?.question}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Thematic Separator (Spacer between Window and Sins) */}
        <div className="flex items-center justify-center py-2 opacity-80">
            <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-steam-brassDark to-transparent"></div>
            <div className="mx-4 relative">
                 <div className="w-2 h-2 rotate-45 border border-steam-rust bg-black shadow-[0_0_8px_rgba(183,65,14,0.5)]"></div>
            </div>
            <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-steam-brassDark to-transparent"></div>
        </div>

        {/* Sin Tracker - Hellish Typography */}
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
                            relative h-24 md:h-24 lg:h-20 flex items-center justify-center border-2 transition-all duration-300 group overflow-hidden
                            ${isDisabled ? 'opacity-20 grayscale border-stone-900 bg-black cursor-not-allowed' : 'border-red-900 bg-black/60 hover:bg-black/90 hover:border-red-600'}
                            ${selectedSin === sin ? 'border-steam-verdigris bg-steam-verdigris/10 shadow-[0_0_15px_rgba(67,179,174,0.4)]' : ''}
                            ${hintMode && active ? 'animate-pulse border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.6)] cursor-pointer' : ''}
                        `}
                        title={SIN_DESCRIPTIONS[sin]}
                    >
                        {/* Background Glitch Effect on Hover */}
                        {!isDisabled && (
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        )}
                        
                        {/* The Hellish Text - Adjusted Size and Spacing for Gluttony */}
                        <span className={`
                            font-rye 
                            text-[9px] md:text-[9px] lg:text-[10px] 
                            tracking-wide md:tracking-normal lg:tracking-wider 
                            rotate-0 md:-rotate-90 lg:rotate-0 
                            transition-transform
                            ${isDisabled ? 'text-gray-700' : 'text-steam-rustLight drop-shadow-[0_0_3px_rgba(183,65,14,0.5)]'}
                        `}>
                            {SIN_ICONS[sin]}
                        </span>
                    </button>
                );
            })}
        </div>

        {/* Revealed Cards Display (During Roleplay) */}
        {gameState.phase === GamePhase.ROLEPLAY && (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto max-h-40 scrollbar-steam p-2 bg-black/20 border border-steam-brassDark">
                {gameState.memoryCards.map(card => (
                    <div 
                        key={card.id} 
                        onClick={() => Backend.revealCard(card.id)}
                        className={`p-2 border text-xs cursor-pointer transition-all ${card.revealed ? 'bg-steam-parchment text-black border-steam-brass' : 'bg-steam-dark text-steam-verdigris border-steam-verdigris border-dashed'}`}
                    >
                        {card.revealed ? (
                            <>
                                <span className="font-bold block">{card.playerNickname}</span>
                                <span className="italic">"{card.word}"</span> ({card.sin})
                            </>
                        ) : (
                            <span className="opacity-50">??? (Click to Reveal)</span>
                        )}
                    </div>
                ))}
             </div>
        )}

      </div>

      {/* Right Column / Bottom Panel: Player Input */}
      <div className="lg:col-span-1 bg-steam-charcoal border-l border-steam-brassDark p-6 flex flex-col justify-between shadow-2xl z-20">
        
        {/* Input Phase Controls */}
        {gameState.phase === GamePhase.INPUT && (
            <div className="space-y-4 animate-fade-in">
                <h3 className="text-steam-brass font-cinzel text-center">
                    Confess {me?.burdened ? "(2 Required)" : "(1 Required)"}
                </h3>
                
                {!selectedSin ? (
                    <p className="text-center text-sm text-steam-parchmentDim italic">Select a Sin from the tracker to begin your confession.</p>
                ) : (
                    <>
                        <div className={`text-center text-xl font-rye mb-2 ${SIN_STYLES[selectedSin]}`}>{SIN_ICONS[selectedSin]}</div>
                        <input 
                            type="text" 
                            maxLength={20}
                            placeholder="Secret Word..." 
                            value={secretWord}
                            onChange={(e) => setSecretWord(e.target.value)}
                            className="w-full bg-steam-parchment text-black p-3 font-playfair border-2 border-steam-brass focus:border-steam-rust outline-none shadow-inner"
                        />
                        <button 
                            onClick={handleSubmitMemory}
                            disabled={!secretWord}
                            className="w-full py-2 bg-steam-brassDark text-steam-parchment border border-steam-brass hover:bg-steam-brass hover:text-black transition-colors disabled:opacity-50"
                        >
                            Seal Memory
                        </button>
                    </>
                )}
                 {/* Feedback on cards submitted */}
                 <div className="text-xs text-center mt-4">
                     You have submitted {gameState.memoryCards.filter(m => m.playerNickname === user.nickname).length} memories.
                 </div>
            </div>
        )}

        {/* Roleplay Phase Controls */}
        {gameState.phase === GamePhase.ROLEPLAY && (
            <div className="space-y-6 text-center">
                <p className="text-sm italic text-steam-parchmentDim">
                    Weave your secret words into the conversation. Listen to others.
                </p>
                
                {!me?.burdened && !hintMode && (
                    <button 
                        onClick={() => setHintMode(true)}
                        className="w-full py-6 bg-gradient-to-b from-red-900 to-black border-4 border-double border-red-600 text-red-100 font-rye text-xl shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:scale-105 transition-transform"
                    >
                        PULL EMERGENCY BRAKE<br/>(TAKE DEBT)
                    </button>
                )}
                {hintMode && (
                    <div className="bg-red-900/50 p-4 border border-red-500 animate-pulse">
                        Select an active SIN icon on the dashboard to disable it for everyone. You will carry the burden next round.
                        <button onClick={() => setHintMode(false)} className="block mx-auto mt-2 underline text-xs">Cancel</button>
                    </div>
                )}
            </div>
        )}

        {/* Round End Controls (Conductor Only) */}
        {gameState.phase === GamePhase.ROUND_END && isConductor && (
             <button 
                onClick={() => Backend.nextRound()}
                className="w-full py-4 mt-auto bg-steam-verdigris text-black font-cinzel font-bold border-2 border-steam-verdigris hover:bg-white transition-colors"
            >
                {gameState.currentRound === 7 ? "ARRIVE AT TERMINUS" : "NEXT WAGON"}
            </button>
        )}
         {gameState.phase === GamePhase.ROUND_END && !isConductor && (
            <div className="mt-auto text-center text-steam-parchmentDim animate-pulse">
                The Conductor is checking the tickets...
            </div>
         )}

      </div>
    </div>
  );
}