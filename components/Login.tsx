import React, { useState } from 'react';
import { User } from '../types';
import { Backend } from '../services/mockBackend';

interface Props {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: Props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let user;
      if (isSignUp) {
        user = await Backend.register(email, password, nickname);
      } else {
        user = await Backend.login(email, password);
      }
      onLogin(user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative z-10 max-w-md mx-auto px-6 py-12 flex flex-col items-center space-y-10 min-h-screen">
      
      {/* Header Section */}
      <header className="text-center w-full space-y-2">
        <h1 className="font-display text-4xl md:text-5xl text-primary uppercase tracking-widest text-glow leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] filter sepia-[0.3]">
          The Purgatory<br/>
          <span className="text-5xl md:text-6xl block mt-2 text-stone-100">Express</span>
        </h1>
        <div className="flex items-center justify-center space-x-4 opacity-80 mt-4 drop-shadow-md">
          <div className="h-px bg-primary/60 w-12 md:w-20"></div>
          <span className="font-serif italic text-sm md:text-base text-stone-300 tracking-wider font-bold">Departure is Imminent</span>
          <div className="h-px bg-primary/60 w-12 md:w-20"></div>
        </div>
      </header>

      {/* Narrative Section */}
      <section className="text-center space-y-6">
        <p className="font-serif italic text-lg leading-relaxed text-stone-200 drop-shadow-md bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/5">
          You have awakened on a train that appears on no map, bound for a destination you are too terrified to name. Outside the windows, a void swallows the light, while inside, the air smells of old regrets and burning coal.
        </p>
        <p className="font-serif italic text-lg leading-relaxed text-stone-200 drop-shadow-md bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/5">
          To leave this purgatory, you must confront the seven deadly sins that stain your soul. Only by confessing your darkest secrets and uncovering the burdens of your fellow passengers can you hope to find redemption.
        </p>
        <div className="text-primary text-2xl flex justify-center py-2 animate-bounce">
          <span className="material-symbols-outlined drop-shadow-[0_0_8px_rgba(194,65,12,0.8)]">fluid</span>
        </div>
      </section>

      {/* Manifest Protocols Section */}
      <section className="w-full relative group">
        <div className="absolute -inset-1 bg-black/80 rounded-sm blur-md"></div>
        <div className="relative w-full border border-stone-700/50 p-6 bg-stone-900/90 backdrop-blur-md shadow-2xl rounded-sm overflow-hidden ring-1 ring-primary/20">
          <div className="absolute inset-0 border-[12px] border-double border-stone-800/40 pointer-events-none"></div>
          <div className="p-4 h-full flex flex-col items-center text-center space-y-4">
            <h2 className="font-heading font-bold text-stone-200 uppercase tracking-[0.2em] text-sm border-b border-primary/50 pb-2 mb-2 drop-shadow-md">
              Manifest Protocols
            </h2>
            <div className="text-primary font-bold text-xs md:text-sm tracking-wider drop-shadow-sm">
              3-5 PLAYERS • 45-60 MIN • NARRATIVE HORROR
            </div>
            <p className="text-[10px] uppercase tracking-wide text-stone-400 font-bold">
              This is a collaborative storytelling experience of hidden truths and social deduction.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-stone-300 font-serif">
              One player assumes the role of the <span className="text-cyan-400 font-bold drop-shadow-sm uppercase">Conductor</span>, guiding the journey through surreal wagons. <span className="text-emerald-400 font-bold drop-shadow-sm uppercase">Passengers</span> draw wagon cards and must anonymously submit "memories"—short, haunting confessions linked to the deadly sins.
            </p>
          </div>
        </div>
      </section>

      {/* Login Ticket Section */}
      <section className="w-full max-w-sm mt-8 relative z-20">
        <div className="ticket-stub tear-edges shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#1c1917] transition-all border-x border-stone-400/20 transform hover:scale-[1.01] duration-500">
          
          {/* Tabs */}
          <div className="flex border-b border-stone-800/50">
            <button 
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-black/60 ${!isSignUp ? 'text-primary border-b-2 border-primary/60 bg-black/40' : 'text-stone-500'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-black/60 ${isSignUp ? 'text-primary border-b-2 border-primary/60 bg-black/40' : 'text-stone-500'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8 pt-10 space-y-6 relative">
            <div className="absolute top-0 left-0 right-0 h-px border-t border-dashed border-stone-400/20 translate-y-[-1px]"></div>
            <h3 className="font-display text-xl text-center text-stone-200 tracking-wide opacity-90 drop-shadow-md">
              {isSignUp ? 'Request Passage' : 'Present Your Ticket'}
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="space-y-1">
                  <label className="sr-only" htmlFor="nickname">Nickname</label>
                  <input 
                    className="block w-full px-4 py-3 bg-stone-900/80 border border-stone-700/50 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all font-serif italic shadow-inner" 
                    id="nickname" 
                    placeholder="Chosen Nickname" 
                    type="text"
                    required
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="sr-only" htmlFor="email">Email Address</label>
                <input 
                  className="block w-full px-4 py-3 bg-stone-900/80 border border-stone-700/50 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all font-serif italic shadow-inner" 
                  id="email" 
                  placeholder="Email Address" 
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="sr-only" htmlFor="password">Password</label>
                <input 
                  className="block w-full px-4 py-3 bg-stone-900/80 border border-stone-700/50 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all font-serif italic shadow-inner" 
                  id="password" 
                  placeholder="Password" 
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-[10px] text-center uppercase tracking-widest font-bold bg-black/40 p-2 border border-red-900/30">{error}</p>}

              <div className="pt-2">
                <button 
                  className="w-full py-4 px-4 bg-accent-red hover:bg-red-900 text-stone-100 font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-red-950/50 rounded-sm relative overflow-hidden group" 
                  type="submit"
                  disabled={loading}
                >
                  <span className="relative z-10 drop-shadow-md">
                    {loading ? 'Validating...' : isSignUp ? 'Board the Train' : 'Validate Ticket'}
                  </span>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine"></div>
                </button>
              </div>
            </form>

            <div className="text-center">
              <a className="text-[10px] text-stone-500 hover:text-primary transition-colors italic uppercase tracking-tighter" href="#">Lost your ticket stub?</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-stone-500 pb-8 text-[10px] font-serif italic opacity-80 uppercase tracking-widest drop-shadow-sm mt-auto bg-black/60 px-4 py-1 rounded-full">
        © The Purgatory Express • No Refunds on Souls
      </footer>
    </main>
  );
}