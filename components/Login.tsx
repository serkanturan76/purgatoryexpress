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
    <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 flex flex-col items-center space-y-20 min-h-screen animate-fade-in">
      
      {/* 1. HERO SECTION (Header & Visual) */}
      <header className="text-center w-full space-y-6">
        <h1 className="font-rye text-6xl md:text-8xl text-primary uppercase tracking-[0.2em] drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] leading-tight">
          The Purgatory<br/>
          <span className="text-stone-100 block mt-4">Express</span>
        </h1>
        <div className="flex items-center justify-center space-x-8 opacity-70">
          <div className="h-px bg-stone-500 w-24 md:w-32"></div>
          <span className="font-playfair italic text-xl text-stone-300 tracking-[0.25em] font-medium uppercase">Departure is Imminent</span>
          <div className="h-px bg-stone-500 w-24 md:w-32"></div>
        </div>
      </header>

      {/* 2. AUTHENTICATION (Login / Signup) - Moving it up for UX but keeping it styled */}
      <section className="w-full max-w-md relative group">
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary/60 z-30"></div>
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-primary/60 z-30"></div>
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-primary/60 z-30"></div>
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary/60 z-30"></div>

        <div className="relative bg-[#0a0a0c]/90 backdrop-blur-md border border-stone-800 shadow-[0_30px_60px_rgba(0,0,0,1)] overflow-hidden">
          <div className="flex border-b border-stone-800/50">
            <button 
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${!isSignUp ? 'text-primary bg-stone-900/40' : 'text-stone-600 hover:text-stone-400 hover:bg-white/5'}`}
            >
              Ticket Holder
            </button>
            <button 
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${isSignUp ? 'text-primary bg-stone-900/40' : 'text-stone-600 hover:text-stone-400 hover:bg-white/5'}`}
            >
              New Passenger
            </button>
          </div>

          <div className="p-10 space-y-8">
            <h3 className="font-cinzel text-base text-center text-stone-200 tracking-[0.2em] uppercase opacity-90">
              {isSignUp ? 'Request Passage' : 'Present Your Ticket'}
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <input className="block w-full px-4 py-3 bg-transparent border border-stone-800 text-stone-100 placeholder-stone-700 focus:outline-none focus:border-primary/60 transition-all font-playfair italic shadow-inner text-sm" placeholder="Chosen Nickname" type="text" required value={nickname} onChange={e => setNickname(e.target.value)} />
              )}
              <input className="block w-full px-4 py-3 bg-transparent border border-stone-800 text-stone-100 placeholder-stone-700 focus:outline-none focus:border-primary/60 transition-all font-playfair italic shadow-inner text-sm" placeholder="Email Address" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              <input className="block w-full px-4 py-3 bg-transparent border border-stone-800 text-stone-100 placeholder-stone-700 focus:outline-none focus:border-primary/60 transition-all font-playfair italic shadow-inner text-sm" placeholder="Password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              {error && <p className="text-red-500 text-[9px] text-center uppercase tracking-[0.15em] font-bold bg-red-950/20 p-2 border border-red-900/30">{error}</p>}
              <button className="w-full py-4 px-4 bg-accent-red hover:bg-red-900 text-stone-100 font-bold uppercase tracking-[0.25em] text-[10px] shadow-lg transition-all duration-300 border border-red-950/50" type="submit" disabled={loading}>
                {loading ? 'Validating...' : isSignUp ? 'Board the Train' : 'Validate Ticket'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. CORE CONTENT SECTION (Rich Text for AdSense) */}
      <section className="w-full space-y-16 py-12">
        
        {/* About the Game (The Pitch) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="font-rye text-3xl text-primary tracking-widest uppercase">The Final Journey</h2>
                <p className="font-playfair italic text-lg text-stone-300 leading-relaxed">
                    The Purgatory Express is not just a game; it is a collaborative narrative journey into the depths of human psyche. Set within a shifting, steampunk locomotive hurtling through the void between worlds, players must confront their own transgressions to achieve salvation.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed">
                    This social deduction experience blends traditional roleplaying with modern psychological horror. As a passenger, you are not merely a player but a soul in transit, bound by the secrets you carry and the choices you make under the watchful eye of the Conductor.
                </p>
            </div>
            <div className="border-2 border-stone-800 p-2 rounded shadow-2xl bg-stone-900/50">
                <div className="border border-stone-700 p-6 space-y-4">
                    <h4 className="font-cinzel text-xs text-stone-400 uppercase tracking-widest border-b border-stone-800 pb-2">Manifest Insights</h4>
                    <ul className="space-y-3 text-[11px] text-stone-300 uppercase tracking-wider">
                        <li><span className="text-primary mr-2">✦</span> Dynamic Wagon Generation</li>
                        <li><span className="text-primary mr-2">✦</span> Sin-Based Social Deduction</li>
                        <li><span className="text-primary mr-2">✦</span> Collective Narrative Progression</li>
                        <li><span className="text-primary mr-2">✦</span> Multi-Ending Salvation Logic</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* How it Works (Detailed Guide) */}
        <div className="space-y-8">
            <h2 className="font-rye text-3xl text-primary tracking-widest uppercase text-center">Mechanics of the Afterlife</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-stone-950/60 p-6 border border-stone-800 space-y-4">
                    <span className="material-symbols-outlined text-4xl text-primary">edit_note</span>
                    <h3 className="font-cinzel font-bold text-stone-200">The Confession</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                        At the start of each round, passengers enter a new Wagon Card. You must submit a "Secret Word" linked to one of the Seven Deadly Sins that matches the environment.
                    </p>
                </div>
                <div className="bg-stone-950/60 p-6 border border-stone-800 space-y-4">
                    <span className="material-symbols-outlined text-4xl text-primary">forum</span>
                    <h3 className="font-cinzel font-bold text-stone-200">The Roleplay</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                        The Conductor guides the conversation. Your goal is to lead other players into saying your secret word without revealing it yourself.
                    </p>
                </div>
                <div className="bg-stone-950/60 p-6 border border-stone-800 space-y-4">
                    <span className="material-symbols-outlined text-4xl text-primary">visibility</span>
                    <h3 className="font-cinzel font-bold text-stone-200">The Reveal</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                        If another passenger speaks your word, your sin is revealed. Reveal enough memories before the train reaches the Terminus to escape Oblivion.
                    </p>
                </div>
            </div>
        </div>

        {/* The Seven Sins (Deep Lore Content) */}
        <div className="bg-[#0a0a0c] border-2 border-stone-800 p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[150px] rotate-12">skull</span>
             </div>
             <div className="relative z-10 space-y-8">
                <h2 className="font-cinzel text-xl text-stone-200 tracking-[0.4em] uppercase text-center">The Burden of the Sins</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {['PRIDE', 'GREED', 'LUST', 'ENVY', 'GLUTTONY', 'WRATH', 'SLOTH'].map(sin => (
                        <div key={sin} className="space-y-1">
                            <div className="text-primary font-rye text-sm">{sin}</div>
                            <div className="text-[9px] text-stone-500 uppercase tracking-tighter italic">Source of Transgression</div>
                        </div>
                    ))}
                    <div className="flex items-center justify-center">
                        <span className="text-stone-500 font-cinzel text-[10px] tracking-widest">AND MORE...</span>
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* 4. LEGAL & FOOTER (Mandatory for AdSense) */}
      <footer className="w-full border-t border-stone-800 pt-12 pb-20 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
                <h4 className="font-rye text-primary uppercase text-sm">Purgatory Express</h4>
                <p className="text-[10px] text-stone-500 leading-relaxed uppercase tracking-wider">
                    A digital table-top experience designed for narrative exploration and psychological social play. Built for web explorers seeking redemption.
                </p>
            </div>
            <div className="space-y-4">
                <h4 className="font-cinzel text-stone-300 uppercase text-xs tracking-widest">Passenger Links</h4>
                <nav className="flex flex-col space-y-2">
                    <a href="#" className="text-[10px] text-stone-600 hover:text-primary transition-colors uppercase tracking-widest">About the Devs</a>
                    <a href="#" className="text-[10px] text-stone-600 hover:text-primary transition-colors uppercase tracking-widest">Community Guidelines</a>
                    <a href="#" className="text-[10px] text-stone-600 hover:text-primary transition-colors uppercase tracking-widest">Technical Support</a>
                </nav>
            </div>
            <div className="space-y-4">
                <h4 className="font-cinzel text-stone-300 uppercase text-xs tracking-widest">Legal Manifest</h4>
                <nav className="flex flex-col space-y-2">
                    <a href="#" className="text-[10px] text-stone-600 hover:text-primary transition-colors uppercase tracking-widest">Privacy Policy</a>
                    <a href="#" className="text-[10px] text-stone-600 hover:text-primary transition-colors uppercase tracking-widest">Terms of Service</a>
                    <a href="#" className="text-[10px] text-stone-600 hover:text-primary transition-colors uppercase tracking-widest">Cookie Policy</a>
                </nav>
            </div>
        </div>
        <div className="text-center pt-8 border-t border-stone-900">
            <p className="text-stone-700 text-[9px] font-serif italic uppercase tracking-[0.3em]">
                © 2024 THE PURGATORY EXPRESS • REGISTERED STATION LOG NO. 09-AF-21
            </p>
        </div>
      </footer>
    </main>
  );
}