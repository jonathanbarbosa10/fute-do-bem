'use client';

import React from 'react';
import { TEAMS, MATCHES } from '@/lib/data';
import { BarChart3, Trophy, Flame, Award, Calendar } from 'lucide-react';

export default function EstatisticasPage() {
  // Aggregate Top Scorers across all 4 teams
  const allPlayers = Object.values(TEAMS).flatMap((t) =>
    t.players.map((p) => ({ ...p, teamName: t.name, flagEmoji: t.flagEmoji }))
  );

  const topScorers = [...allPlayers]
    .filter((p) => p.goals && p.goals > 0)
    .sort((a, b) => (b.goals || 0) - (a.goals || 0))
    .slice(0, 5);

  const topAssists = [...allPlayers]
    .filter((p) => p.assists && p.assists > 0)
    .sort((a, b) => (b.assists || 0) - (a.assists || 0))
    .slice(0, 5);

  const standings = [
    { pos: 1, team: TEAMS.brasil, pts: 6, j: 2, v: 2, e: 0, d: 0, gp: 5, gc: 2, sg: 3 },
    { pos: 2, team: TEAMS.argentina, pts: 4, j: 2, v: 1, e: 1, d: 0, gp: 4, gc: 3, sg: 1 },
    { pos: 3, team: TEAMS.franca, pts: 1, j: 2, v: 0, e: 1, d: 1, gp: 2, gc: 3, sg: -1 },
    { pos: 4, team: TEAMS.alemanha, pts: 0, j: 2, v: 0, e: 0, d: 2, gp: 1, gc: 4, sg: -3 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-4 border-b border-fute-border/60">
        <h1 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-fute-purpleBright" />
          Estatísticas & Classificação
        </h1>
        <p className="text-xs text-fute-purpleLight">
          Acompanhe o desempenho das seleções, artilharia e assistências do torneio beneficente.
        </p>
      </div>

      {/* Standings Table */}
      <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-fute-border/60 pb-3">
          <Trophy className="w-5 h-5 text-fute-gold" />
          <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
            Tabela de Classificação
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-fute-sidebar/80 text-fute-purpleLight uppercase text-[10px] font-bold border-b border-fute-border/60">
              <tr>
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Seleção</th>
                <th className="py-3 px-3 text-center">PTS</th>
                <th className="py-3 px-3 text-center">J</th>
                <th className="py-3 px-3 text-center">V</th>
                <th className="py-3 px-3 text-center">E</th>
                <th className="py-3 px-3 text-center">D</th>
                <th className="py-3 px-3 text-center">GP</th>
                <th className="py-3 px-3 text-center">GC</th>
                <th className="py-3 px-3 text-center">SG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fute-border/40">
              {standings.map((row) => (
                <tr key={row.team.id} className="hover:bg-fute-cardHover/60 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-white">{row.pos}</td>
                  <td className="py-3.5 px-3 font-extrabold text-white flex items-center gap-2">
                    <span className="text-xl">{row.team.flagEmoji}</span>
                    <span>{row.team.name}</span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-black text-fute-gold text-sm">{row.pts}</td>
                  <td className="py-3.5 px-3 text-center font-mono">{row.j}</td>
                  <td className="py-3.5 px-3 text-center font-mono">{row.v}</td>
                  <td className="py-3.5 px-3 text-center font-mono">{row.e}</td>
                  <td className="py-3.5 px-3 text-center font-mono">{row.d}</td>
                  <td className="py-3.5 px-3 text-center font-mono">{row.gp}</td>
                  <td className="py-3.5 px-3 text-center font-mono">{row.gc}</td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold">{row.sg > 0 ? `+${row.sg}` : row.sg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Top Scorers (Left) vs Top Assists (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Scorers */}
        <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-fute-border/60 pb-3">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
              Artilharia (Gols)
            </h3>
          </div>

          <div className="space-y-2">
            {topScorers.map((p, idx) => (
              <div
                key={p.id}
                className="p-3 bg-fute-sidebar/80 border border-fute-border/40 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 font-black text-fute-purpleLight text-center text-xs">
                    #{idx + 1}
                  </span>
                  <span className="text-xl">{p.flagEmoji}</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{p.name}</h4>
                    <span className="text-[10px] text-fute-purpleLight/70">{p.teamName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-black">
                  <span>{p.goals}</span>
                  <span className="text-[10px] font-normal">Gols</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Assists */}
        <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-fute-border/60 pb-3">
            <Award className="w-5 h-5 text-fute-purpleBright" />
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
              Líderes de Assistências
            </h3>
          </div>

          <div className="space-y-2">
            {topAssists.map((p, idx) => (
              <div
                key={p.id}
                className="p-3 bg-fute-sidebar/80 border border-fute-border/40 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 font-black text-fute-purpleLight text-center text-xs">
                    #{idx + 1}
                  </span>
                  <span className="text-xl">{p.flagEmoji}</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{p.name}</h4>
                    <span className="text-[10px] text-fute-purpleLight/70">{p.teamName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-black">
                  <span>{p.assists}</span>
                  <span className="text-[10px] font-normal">Passes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
