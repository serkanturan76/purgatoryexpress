import React, { useState, useEffect } from 'react';
import { Backend } from './services/mockBackend';
import { GamePhase, User, GameState } from './types';
import Login from './components/Login';
import Lobby from './components/Lobby';
import GameRoom from './components/GameRoom';
import StationLog from './components/StationLog';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [view, setView] = useState<'AUTH' | 'GAME' | 'LOGS'>('AUTH');

  useEffect(() => {
    const unsubscribe = Backend.subscribe(() => {
      setGameState({ ...Backend.getGameState() } as GameState);
    });
    return unsubscribe;
  }, []);

  // Global Timer Tick
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState?.timerActive) {
        Backend.tickTimer();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState?.timerActive]);

  const handleLogin = (u: User) => {
    setUser(u);
    setView('GAME');
  };

  const handleLogout = () => {
      setUser(null);
      Backend.leaveGame();
      setView('AUTH');
  }

  return (
    <div className="min-h-screen bg-steam-dark text-steam-parchment font-cinzel relative overflow-x-hidden">
      {/* Background: Steam Train in Fog */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div> {/* Slightly lighter overlay */}
        <div 
            className="absolute inset-0 bg-cover bg-center animate-pulse-slow"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495573468499-28c049448834?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/hsimpson/pattern-library/master/patterns/fog/fog.png')] bg-cover opacity-30 animate-fog-drift z-20"></div>
      </div>
      
      {/* CRT/Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_95%)]"></div>

      {/* Main Content */}
      <div className="relative z-30 container mx-auto px-4 py-6 min-h-screen flex flex-col">
        {/* Header (Only visible if logged in, otherwise Login component handles headers) */}
        {user && (
            <header className="flex justify-between items-center mb-6 border-b-2 border-steam-brassDark pb-4 bg-black/40 p-4 rounded-lg backdrop-blur-sm">
                <h1 className="text-2xl md:text-4xl font-rye text-steam-rustLight tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    The Purgatory Express
                </h1>
                <div className="flex gap-4 items-center font-playfair">
                    <span className="text-steam-verdigris font-bold hidden md:block">{user.nickname}</span>
                    <button 
                        onClick={() => setView(view === 'GAME' ? 'LOGS' : 'GAME')}
                        className="px-3 py-1 border border-steam-brass text-sm hover:bg-steam-brass hover:text-black transition-colors bg-black/20"
                    >
                        {view === 'GAME' ? 'Station Log' : 'Back to Train'}
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-300 text-sm font-bold tracking-wider transition-colors drop-shadow-sm"
                    >
                        Disembark
                    </button>
                </div>
            </header>
        )}

        <main className="flex-grow flex flex-col">
            {!user ? (
                <Login onLogin={handleLogin} />
            ) : view === 'LOGS' ? (
                <StationLog isAdmin={user.isAdmin} />
            ) : !gameState ? (
                <Lobby user={user} />
            ) : (
                <GameRoom gameState={gameState} user={user} />
            )}
        </main>
      </div>
    </div>
  );
}