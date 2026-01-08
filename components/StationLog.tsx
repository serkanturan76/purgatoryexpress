import React, { useState, useEffect } from 'react';
import { Backend } from '../services/mockBackend';
import { StationLogEntry } from '../types';

interface Props {
  isAdmin: boolean;
}

export default function StationLog({ isAdmin }: Props) {
  const [logs, setLogs] = useState<StationLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await Backend.getLogs();
      setLogs(data);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  const handleDelete = async (id: string) => {
    await Backend.deleteLog(id);
    const data = await Backend.getLogs();
    setLogs(data);
  };

  if (loading) return <div className="p-10 text-center animate-pulse text-steam-brass text-2xl font-rye">Checking records...</div>;

  return (
    <div className="flex-grow p-4 md:p-10 max-w-6xl mx-auto w-full animate-fade-in">
      <h2 className="text-4xl font-rye text-steam-brass mb-8 border-b-4 border-steam-brass pb-4 tracking-widest drop-shadow-md">
        The Station Log
      </h2>

      {logs.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-steam-brassDark/40 bg-black/20">
            <p className="text-steam-parchment text-xl font-playfair italic">No journeys recorded yet in this timeline.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-2xl">
          <table className="w-full border-collapse border-2 border-steam-brassDark text-left font-playfair">
            <thead>
              <tr className="bg-steam-brassDark text-black font-bold uppercase tracking-widest text-sm">
                <th className="p-4 border border-steam-brassDark">Date</th>
                <th className="p-4 border border-steam-brassDark">Passenger Manifest</th>
                <th className="p-4 border border-steam-brassDark text-center">Souls</th>
                <th className="p-4 border border-steam-brassDark text-center">Score Ratio</th>
                {isAdmin && <th className="p-4 border border-steam-brassDark text-center">Admin</th>}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-steam-charcoal/80 transition-colors border-b border-steam-brassDark/40 bg-black/40">
                  <td className="p-4 border-r border-steam-brassDark/40 text-steam-parchment font-bold">{log.date}</td>
                  <td className="p-4 border-r border-steam-brassDark/40 text-steam-rustLight font-bold text-lg">{log.playerNicknames.join(", ")}</td>
                  <td className="p-4 border-r border-steam-brassDark/40 text-center text-steam-parchment font-bold">{log.playerCount}</td>
                  <td className="p-4 border-r border-steam-brassDark/40 text-center font-mono text-steam-verdigris font-black text-xl">{log.scoreRatio}</td>
                  {isAdmin && (
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDelete(log.id)}
                        className="text-xs px-4 py-2 border-2 border-red-700 text-red-400 font-bold hover:bg-red-900 hover:text-white transition-all uppercase tracking-widest shadow-md"
                      >
                        BURN
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-8 text-center text-steam-parchmentDim text-xs italic opacity-70">"All records are permanent until consigned to the furnace."</p>
    </div>
  );
}