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

      {/* Ticket Counter / Login Form */}
      <div className="w-full max-w-md relative mt-12">
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