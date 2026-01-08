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
    <div className="flex flex-col items-center justify-start w-full max-w-5xl mx-auto space-y-12 pb-20 pt-10">
      
      {/* Title Section */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-rye text-steam-rust tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,1)]">
          THE PURGATORY EXPRESS
        </h1>
        <div className="flex items-center justify-center gap-4 text-steam-parchmentDim">
          <span className="h-[1px] w-12 bg-steam-parchmentDim"></span>
          <span className="font-playfair italic text-xl tracking-wider">Departure is Imminent</span>
          <span className="h-[1px] w-12 bg-steam-parchmentDim"></span>
        </div>
      </div>

      {/* Narrative Intro Text */}
      <div className="max-w-3xl text-center px-6">
        <p className="font-playfair italic text-steam-parchmentDim text-lg md:text-xl leading-relaxed tracking-wide opacity-90">
          You have awakened on a train that appears on no map, bound for a destination you 
          are too terrified to name. Outside the windows, a void swallows the light, while inside, 
          the air smells of old regrets and burning coal. To leave this purgatory, you must 
          confront the seven deadly sins that stain your soul. Only by confessing your darkest 
          secrets and uncovering the burdens of your fellow passengers can you hope to find 
          redemption.
        </p>
      </div>

      {/* Divider Icon */}
      <div className="text-steam-rust text-2xl transform rotate-45">
        <div className="grid grid-cols-2 gap-1 scale-75">
          <div className="w-2 h-2 bg-steam-rust"></div>
          <div className="w-2 h-2 bg-steam-rust"></div>
          <div className="w-2 h-2 bg-steam-rust"></div>
          <div className="w-2 h-2 bg-steam-rust"></div>
        </div>
      </div>

      {/* Manifest Protocols Box */}
      <div className="w-full max-w-4xl border border-steam-brassDark/40 p-1 bg-black/20">
        <div className="border border-steam-brassDark/60 p-8 md:p-12 text-center space-y-8 bg-steam-dark/40 backdrop-blur-sm">
            <div className="space-y-2">
                <h2 className="font-cinzel text-steam-brass tracking-[0.3em] text-sm md:text-base border-b border-steam-rust/40 pb-2 inline-block">
                    MANIFEST PROTOCOLS
                </h2>
                <div className="text-steam-rust font-cinzel text-xs md:text-sm tracking-widest font-bold pt-4">
                    3-5 PLAYERS • 45-60 MIN • NARRATIVE HORROR
                </div>
            </div>

            <div className="space-y-6 text-steam-parchmentDim font-cinzel text-[10px] md:text-xs leading-loose tracking-widest max-w-2xl mx-auto uppercase">
                <p>THIS IS A COLLABORATIVE STORYTELLING EXPERIENCE OF HIDDEN TRUTHS AND SOCIAL DEDUCTION.</p>
                
                <p>
                    ONE PLAYER ASSUMES THE ROLE OF THE <strong className="text-steam-parchment font-bold">CONDUCTOR</strong>, 
                    GUIDING THE JOURNEY THROUGH SURREAL WAGONS. <strong className="text-steam-parchment font-bold">PASSENGERS</strong> DRAW 
                    WAGON CARDS AND MUST ANONYMOUSLY SUBMIT "MEMORIES"—SHORT, HAUNTING CONFESSIONS LINKED TO THE DEADLY SINS. 
                    THE GROUP MUST DISCUSS THESE REVELATIONS TO DEDUCE WHO CARRIES WHICH BURDEN. POINTS ARE AWARDED 
                    FOR INSIGHT AND HONESTY, BUT THE TRUE VICTORY IS SURVIVING THE JOURNEY WITH YOUR SOUL INTACT.
                </p>
            </div>
        </div>
      </div>

      {/* Ticket Counter / Login Form */}
      <div className="w-full max-w-md relative">
        <div className="bg-steam-charcoal/90 border-t-4 border-steam-rust p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            
            {/* Form Toggle Tabs */}
            <div className="flex border-b border-steam-brassDark mb-6">
                <button 
                    onClick={() => setIsSignUp(false)}
                    className={`flex-1 pb-2 text-center transition-colors ${!isSignUp ? 'text-steam-rust border-b-2 border-steam-rust' : 'text-steam-parchmentDim hover:text-steam-parchment'}`}
                >
                    SIGN IN
                </button>
                <button 
                    onClick={() => setIsSignUp(true)}
                    className={`flex-1 pb-2 text-center transition-colors ${isSignUp ? 'text-steam-rust border-b-2 border-steam-rust' : 'text-steam-parchmentDim hover:text-steam-parchment'}`}
                >
                    SIGN UP
                </button>
            </div>

            <h3 className="text-xl font-cinzel text-center mb-6 text-steam-parchment tracking-widest">
                {isSignUp ? 'REQUEST PASSAGE' : 'PRESENT YOUR TICKET'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 font-playfair">
                {isSignUp && (
                <div>
                    <input
                    type="text"
                    required
                    placeholder="Chosen Nickname"
                    className="w-full bg-steam-dark/50 border border-steam-brassDark p-3 text-steam-parchment focus:border-steam-rust outline-none transition-colors placeholder:text-steam-parchmentDim/50"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    />
                </div>
                )}
                <div>
                <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full bg-steam-dark/50 border border-steam-brassDark p-3 text-steam-parchment focus:border-steam-rust outline-none transition-colors placeholder:text-steam-parchmentDim/50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </div>
                <div>
                <input
                    type="password"
                    required
                    placeholder="Password"
                    className="w-full bg-steam-dark/50 border border-steam-brassDark p-3 text-steam-parchment focus:border-steam-rust outline-none transition-colors placeholder:text-steam-parchmentDim/50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </div>

                {error && <p className="text-red-500 text-center text-sm bg-black/50 p-2 border border-red-900">{error}</p>}

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-900 to-red-950 text-steam-parchment font-cinzel font-bold py-3 border border-steam-rust hover:from-red-800 hover:to-red-900 transition-all shadow-lg tracking-widest mt-4 disabled:opacity-50"
                >
                {loading ? 'PROCESSING...' : (isSignUp ? 'BOARD THE TRAIN' : 'VALIDATE TICKET')}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}
