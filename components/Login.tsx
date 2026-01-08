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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      let user;
      if (isSignUp) {
        user = Backend.register(email, password, nickname);
      } else {
        user = Backend.login(email, password);
      }
      onLogin(user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-5xl mx-auto space-y-12 pb-20 pt-10">
      
      {/* Title Section */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-rye text-steam-rust tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
          THE PURGATORY EXPRESS
        </h1>
        <div className="flex items-center justify-center gap-4 text-steam-parchmentDim">
          <span className="h-[1px] w-12 bg-steam-parchmentDim"></span>
          <span className="font-playfair italic text-xl tracking-wider">Departure is Imminent</span>
          <span className="h-[1px] w-12 bg-steam-parchmentDim"></span>
        </div>
      </div>

      {/* Narrative Intro */}
      <div className="max-w-3xl text-center text-lg md:text-xl font-playfair leading-relaxed text-steam-parchment drop-shadow-md">
        <p>
          You have awakened on a train that appears on no map, bound for a destination you are too terrified to name. 
          Outside the windows, a void swallows the light, while inside, the air smells of old regrets and burning coal. 
          To leave this purgatory, you must confront the seven deadly sins that stain your soul. Only by confessing your 
          darkest secrets and uncovering the burdens of your fellow passengers can you hope to find redemption.
        </p>
        <div className="mt-8 text-steam-rust text-2xl">❖</div>
      </div>

      {/* Manifest Protocols (Game Details) */}
      <div className="w-full max-w-4xl border border-steam-brassDark/50 bg-black/40 p-1">
        <div className="border border-steam-brassDark p-6 md:p-8 flex flex-col items-center text-center space-y-6">
            <h2 className="text-steam-rustLight font-cinzel tracking-[0.2em] border-b border-steam-rustLight pb-1 text-sm md:text-base">
                MANIFEST PROTOCOLS
            </h2>
            
            <div className="text-steam-rust font-bold tracking-widest text-sm md:text-base">
                3-5 PLAYERS • 45-60 MIN • NARRATIVE HORROR
            </div>

            <p className="font-cinzel text-xs md:text-sm leading-loose text-steam-parchmentDim max-w-3xl">
                THIS IS A COLLABORATIVE STORYTELLING EXPERIENCE OF HIDDEN TRUTHS AND SOCIAL DEDUCTION. 
            </p>
            <p className="font-cinzel text-xs md:text-sm leading-loose text-steam-parchmentDim max-w-3xl">
                ONE PLAYER ASSUMES THE ROLE OF THE <strong className="text-steam-parchment">CONDUCTOR</strong>, GUIDING THE JOURNEY THROUGH SURREAL WAGONS. 
                <strong className="text-steam-parchment"> PASSENGERS</strong> DRAW WAGON CARDS AND MUST ANONYMOUSLY SUBMIT "MEMORIES"—SHORT, HAUNTING CONFESSIONS LINKED TO THE DEADLY SINS. 
                THE GROUP MUST DISCUSS THESE REVELATIONS TO DEDUCE WHO CARRIES WHICH BURDEN. 
                POINTS ARE AWARDED FOR INSIGHT AND HONESTY, BUT THE TRUE VICTORY IS SURVIVING THE JOURNEY WITH YOUR SOUL INTACT.
            </p>
        </div>
      </div>

      {/* Ticket Counter / Login Form */}
      <div className="w-full max-w-md relative mt-12">
        {/* Decorative corners */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-steam-rust"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-steam-rust"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-steam-rust"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-steam-rust"></div>

        <div className="bg-steam-charcoal/90 border-t-4 border-steam-rust p-8 shadow-2xl backdrop-blur-md">
            
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
                PRESENT YOUR TICKET
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

                {error && <p className="text-steam-rust text-center text-sm bg-black/50 p-1 border border-steam-rust/30">{error}</p>}

                <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-900 to-red-950 text-steam-parchment font-cinzel font-bold py-3 border border-steam-rust hover:from-red-800 hover:to-red-900 transition-all shadow-lg tracking-widest mt-4"
                >
                {isSignUp ? 'BOARD THE TRAIN' : 'VALIDATE TICKET'}
                </button>
            </form>
        </div>
      </div>

    </div>
  );
}