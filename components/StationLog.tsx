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

  if (loading) return <div className="p-10 text-center animate-pulse">Checking records...</div>;

  return (
    <div className="flex-grow p-4 md:p-10 max-w-6xl mx-auto w-full">
      <h2 className="text-4xl font-rye text-steam-brass mb-8 border-b-2 border-steam-brass pb-4">
        The Station Log
      </h2>

      {logs.length === 0 ? (
        <p className="text-steam-parchmentDim italic">No journeys recorded yet in this timeline.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-steam-brassDark text-left font-playfair">
            <thead>
              <tr className="bg-steam-brassDark text-black">
                <th className="p-3 border border-steam-brassDark">Date</th>
                <th className="p-3 border border-steam-brassDark">Passenger Manifest</th>
                <th className="p-3 border border-steam-brassDark text-center">Souls</th>
                <th className="p-3 border border-steam-brassDark text-center">Score Ratio</th>
                {isAdmin && <th className="p-3 border border-steam-brassDark text-center">Admin</th>}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-steam-charcoal/50 transition-colors border-b border-steam-brassDark/30">
                  <td className="p-3 border-r border-steam-brassDark/30 text-steam-parchmentDim">{log.date}</td>
                  <td className="p-3 border-r border-steam-brassDark/30 text-steam-rustLight">{log.playerNicknames.join(", ")}</td>
                  <td className="p-3 border-r border-steam-brassDark/30 text-center">{log.playerCount}</td>
                  <td className="p-3 border-r border-steam-brassDark/30 text-center font-mono text-steam-verdigris">{log.scoreRatio}</td>
                  {isAdmin && (
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => handleDelete(log.id)}
                        className="text-xs px-2 py-1 border border-red-900 text-red-500 hover:bg-red-900 hover:text-white transition-colors uppercase"
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
    </div>
  );
}