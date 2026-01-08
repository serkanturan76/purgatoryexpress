import React, { useState } from 'react';
import { User } from '../types';
import { Backend } from '../services/mockBackend';

interface Props {
  user: User;
}

export default function Lobby({ user }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await Backend.createGame(user.nickname);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Backend.joinGame(code, user.nickname);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-rye text-steam-verdigris">Platform 7</h2>
        <p className="text-steam-parchmentDim font-playfair italic max-w-lg">
          "Identify yourself before boarding. The journey is long, and the company... questionable."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Conductor Panel */}
        <div className="bg-steam-charcoal/60 border border-steam-brass p-8 flex flex-col items-center text-center hover:bg-steam-charcoal/80 transition-colors group">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💠</div>
          <h3 className="text-2xl font-cinzel text-steam-brass mb-2">Conductor</h3>
          <p className="text-sm text-steam-parchmentDim mb-6 min-h-[40px]">
            Create a new session. Become the architect of this purgatory.
          </p>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-8 py-3 bg-steam-rust/20 border border-steam-rust text-steam-rustLight hover:bg-steam-rust hover:text-white transition-all font-bold tracking-widest disabled:opacity-50"
          >
            {loading ? 'OPENING GATES...' : 'CREATE GAME'}
          </button>
        </div>

        {/* Passenger Panel */}
        <div className="bg-steam-charcoal/60 border border-steam-brass p-8 flex flex-col items-center text-center hover:bg-steam-charcoal/80 transition-colors group">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">✦</div>
          <h3 className="text-2xl font-cinzel text-steam-brass mb-2">Passenger</h3>
          <p className="text-sm text-steam-parchmentDim mb-6 min-h-[40px]">
            Join an existing session using a 6-digit ticket code.
          </p>
          <form onSubmit={handleJoin} className="flex flex-col gap-4 w-full max-w-xs">
            <input
              type="text"
              placeholder="Ticket Code"
              className="bg-steam-dark border border-steam-brassDark p-2 text-center text-xl tracking-widest text-steam-parchment focus:border-steam-verdigris outline-none"
              value={code}
              onChange={e => setCode(e.target.value)}
              maxLength={6}
            />
            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="px-8 py-3 bg-steam-verdigris/20 border border-steam-verdigris text-steam-verdigris hover:bg-steam-verdigris hover:text-black transition-all font-bold tracking-widest disabled:opacity-50"
            >
              {loading ? 'VALIDATING...' : 'JOIN GAME'}
            </button>
          </form>
        </div>
      </div>
      
      {error && <p className="text-steam-rust bg-black/50 px-4 py-2 border border-steam-rust">{error}</p>}
    </div>
  );
}