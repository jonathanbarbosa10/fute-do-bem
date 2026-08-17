'use client';

import React, { useState } from 'react';
import { Player, Team } from '@/lib/types';
import { Activity } from 'lucide-react';

interface TacticalPitchProps {
  team: Team;
}

export const TacticalPitch: React.FC<TacticalPitchProps> = ({ team }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Group players by position for Futebol Society (1 GK + 7 Field)
  const goalkeepers = team.players.filter((p) => p.position === 'Goleiro');
  const defenders = team.players.filter((p) => p.position === 'Defesa');
  const midfielders = team.players.filter((p) => p.position === 'Meio-campo');
  const forwards = team.players.filter((p) => p.position === 'Atacante');

  // Pitch layout coordinates (%)
  const getPositionCoords = (index: number, total: number, rowY: number) => {
    const count = Math.max(total, 1);
    const spacing = 80 / (count + 1);
    const x = spacing * (index + 1) + 10;
    return { x: `${x}%`, y: `${rowY}%` };
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tactical Pitch Container */}
      <div className="relative w-full aspect-[4/3] max-h-[460px] bg-gradient-to-b from-emerald-900 via-emerald-800 to-green-950 border-2 border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden p-4">
        {/* Grass Texture & Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-400/40 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-28 h-28 border-2 border-emerald-400/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 left-1/4 right-1/4 h-16 border-b-2 border-x-2 border-emerald-400/40 rounded-b-xl" />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-16 border-t-2 border-x-2 border-emerald-400/40 rounded-t-xl" />

        {/* Pitch Title Header */}
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30">
          <span className="text-xl">{team.flagEmoji}</span>
          <span className="text-xs font-bold text-white uppercase tracking-wider">{team.name}</span>
          <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-500/20 rounded border border-emerald-500/30">
            Futebol Society (1 Gol + 7 Linha)
          </span>
        </div>

        {/* ---------------- PLAYER NODES ON PITCH (SOCIETY 8-A-SIDE) ---------------- */}
        {/* Goalkeeper (1 in Goal - Row 88%) */}
        {goalkeepers.slice(0, 1).map((p, idx) => {
          const pos = getPositionCoords(idx, 1, 88);
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlayer(p)}
              style={{ left: pos.x, top: pos.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform duration-200 hover:scale-110"
            >
              <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center border-2 border-white shadow-lg group-hover:bg-amber-400 text-xs">
                #{p.number}
              </div>
              <span className="mt-1 text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-md border border-amber-500/40 whitespace-nowrap shadow-md">
                {p.name.split(' ')[0]} (GOL)
              </span>
            </button>
          );
        })}

        {/* Defenders / Zagueiros (Row 68%) */}
        {defenders.slice(0, 3).map((p, idx) => {
          const pos = getPositionCoords(idx, Math.min(defenders.length, 3), 68);
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlayer(p)}
              style={{ left: pos.x, top: pos.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform duration-200 hover:scale-110"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center border-2 border-white shadow-lg group-hover:bg-blue-500 text-xs">
                #{p.number}
              </div>
              <span className="mt-1 text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-md border border-blue-500/40 whitespace-nowrap shadow-md">
                {p.name.split(' ')[0]}
              </span>
            </button>
          );
        })}

        {/* Midfielders / Meias (Row 42%) */}
        {midfielders.slice(0, 2).map((p, idx) => {
          const pos = getPositionCoords(idx, Math.min(midfielders.length, 2), 42);
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlayer(p)}
              style={{ left: pos.x, top: pos.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform duration-200 hover:scale-110"
            >
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center border-2 border-white shadow-lg group-hover:bg-purple-500 text-xs">
                #{p.number}
              </div>
              <span className="mt-1 text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-md border border-purple-500/40 whitespace-nowrap shadow-md">
                {p.name.split(' ')[0]}
              </span>
            </button>
          );
        })}

        {/* Attackers / Atacantes (Row 18%) */}
        {forwards.slice(0, 2).map((p, idx) => {
          const pos = getPositionCoords(idx, Math.min(forwards.length, 2), 18);
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlayer(p)}
              style={{ left: pos.x, top: pos.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform duration-200 hover:scale-110"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center border-2 border-white shadow-lg group-hover:bg-emerald-400 text-xs">
                #{p.number}
              </div>
              <span className="mt-1 text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-md border border-emerald-500/40 whitespace-nowrap shadow-md">
                {p.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Player Detail Modal / Info Strip */}
      {selectedPlayer && (
        <div className="p-3 bg-fute-card border border-fute-purpleBright/40 rounded-xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-fute-purple/30 border border-fute-purpleLight flex items-center justify-center font-black text-white text-lg">
              #{selectedPlayer.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white text-sm">{selectedPlayer.name}</h4>
                {selectedPlayer.isCaptain && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                    Capitão
                  </span>
                )}
              </div>
              <p className="text-xs text-fute-purpleLight">
                Posição Fixa (Society): <strong className="text-white">{selectedPlayer.position}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedPlayer(null)}
            className="text-xs text-purple-300 hover:text-white px-2.5 py-1 bg-fute-border/50 rounded-lg"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};
