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
    <main className="relative z-10 max-w-2xl mx-auto px-6 py-16 flex flex-col items-center space-y-12 min-h-screen animate-fade-in">
      
      {/* Header Section */}
      <header className="text-center w-full space-y-4">
        <h1 className="font-rye text-5xl md:text-7xl text-primary uppercase tracking-[0.15em] drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] leading-tight">
          The Purgatory<br/>
          <span className="text-stone-100 block mt-2">Express</span>
        </h1>
        <div className="flex items-center justify-center space-x-6 opacity-70">
          <div className="h-px bg-stone-500 w-16 md:w-24"></div>
          <span className="font-playfair italic text-lg text-stone-300 tracking-widest font-medium">Departure is Imminent</span>
          <div className="h-px bg-stone-500 w-16 md:w-24"></div>
        </div>
      </header>

      {/* Narrative Section */}
      <section className="text-center space-y-8 max-w-xl">
        <div className="bg-black/60 p-8 rounded-2xl backdrop-blur-sm border border-white/5 shadow-2xl">
          <p className="font-playfair italic text-lg md:text-xl leading-relaxed text-stone-300 drop-shadow-md">
            You have awakened on a train that appears on no map, bound for a destination you are too terrified to name. Outside the windows, a void swallows the light, while inside, the air smells of old regrets and burning coal.
          </p>
          <p className="font-playfair italic text-lg md:text-xl leading-relaxed text-stone-300 drop-shadow-md mt-6">
            To leave this purgatory, you must confront the seven deadly sins that stain your soul. Only by confessing your darkest secrets and uncovering the burdens of your fellow passengers can you hope to find redemption.
          </p>
        </div>
        
        {/* Decorative Divider Icon */}
        <div className="text-primary/60 text-3xl flex justify-center py-2">
            <span className="material-symbols-outlined select-none drop-shadow-[0_0_10px_rgba(194,65,12,0.4)]">settings_ethernet</span>
        </div>
      </section>

      {/* Manifest Protocols Box (Double Border) */}
      <section className="w-full max-w-2xl">
        <div className="relative border-2 border-stone-800 p-2 rounded-sm shadow-2xl">
            <div className="border-[3px] border-double border-stone-700/60 p-8 bg-stone-950/40 flex flex-col items-center text-center space-y-6">
                <h2 className="font-cinzel font-bold text-primary uppercase tracking-[0.3em] text-sm border-b border-primary/30 pb-3 mb-2">
                    Manifest Protocols
                </h2>
                <div className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                    3-5 Players • 45-60 Min • Narrative Horror
                </div>
                <p className="text-[11px] md:text-xs leading-relaxed text-stone-400 font-serif max-w-lg leading-relaxed tracking-wider uppercase opacity-80">
                    This is a collaborative storytelling experience of hidden truths and social deduction. One player assumes the role of the <span className="text-stone-100 font-bold">CONDUCTOR</span>, guiding the journey through surreal wagons. <span className="text-stone-100 font-bold">PASSENGERS</span> draw wagon cards and must anonymously submit "memories"—short, haunting confessions linked to the deadly sins. The group must discuss these revelations to deduce who carries which burden. Points are awarded for insight and honesty, but the true victory is surviving the journey with your soul intact.
                </p>
            </div>
        </div>
      </section>

      {/* Login Ticket Section (Corner Brackets) */}
      <section className="w-full max-w-md mt-4 relative group">
        
        {/* Corner Decorations */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary/60 z-30"></div>
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-primary/60 z-30"></div>
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-primary/60 z-30"></div>
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary/60 z-30"></div>

        <div className="relative bg-[#0a0a0c] border border-stone-800 shadow-[0_30px_60px_rgba(0,0,0,1)] overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-stone-800/50">
            <button 
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${!isSignUp ? 'text-primary bg-stone-900/40' : 'text-stone-600 hover:text-stone-400 hover:bg-white/5'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${isSignUp ? 'text-primary bg-stone-900/40' : 'text-stone-600 hover:text-stone-400 hover:bg-white/5'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-10 space-y-8">
            <h3 className="font-cinzel text-base text-center text-stone-200 tracking-[0.2em] uppercase opacity-90">
              {isSignUp ? 'Request Passage' : 'Present Your Ticket'}
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="relative">
                  <input 
                    className="block w-full px-4 py-3 bg-transparent border border-stone-800 text-stone-100 placeholder-stone-700 focus:outline-none focus:border-primary/60 transition-all font-playfair italic shadow-inner text-sm" 
                    id="nickname" 
                    placeholder="Chosen Nickname" 
                    type="text"
                    required
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                  />
                </div>
              )}
              <div className="relative">
                <input 
                  className="block w-full px-4 py-3 bg-transparent border border-stone-800 text-stone-100 placeholder-stone-700 focus:outline-none focus:border-primary/60 transition-all font-playfair italic shadow-inner text-sm" 
                  id="email" 
                  placeholder="Email Address" 
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <input 
                  className="block w-full px-4 py-3 bg-transparent border border-stone-800 text-stone-100 placeholder-stone-700 focus:outline-none focus:border-primary/60 transition-all font-playfair italic shadow-inner text-sm" 
                  id="password" 
                  placeholder="Password" 
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-500 text-[9px] text-center uppercase tracking-[0.15em] font-bold bg-red-950/20 p-2 border border-red-900/30">
                  {error}
                </p>
              )}

              <div className="pt-2">
                <button 
                  className="w-full py-4 px-4 bg-accent-red hover:bg-red-900 text-stone-100 font-bold uppercase tracking-[0.25em] text-[10px] shadow-lg hover:shadow-red-900/20 transition-all duration-300 border border-red-950/50 relative overflow-hidden group" 
                  type="submit"
                  disabled={loading}
                >
                  <span className="relative z-10 drop-shadow-md">
                    {loading ? 'Validating...' : isSignUp ? 'Board the Train' : 'Validate Ticket'}
                  </span>
                </button>
              </div>
            </form>

            {!isSignUp && (
              <div className="text-center">
                <a className="text-[9px] text-stone-600 hover:text-primary transition-colors italic uppercase tracking-widest" href="#">Lost your ticket stub?</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="text-stone-600 pb-12 text-[10px] font-serif italic opacity-70 uppercase tracking-[0.2em] mt-auto">
        © The Purgatory Express • No Refunds on Souls
      </footer>
    </main>
  );
}