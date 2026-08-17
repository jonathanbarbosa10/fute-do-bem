'use client';

import React, { useState, useEffect } from 'react';
import { TEAMS } from '@/lib/data';
import { BarChart3, Trophy, Flame, Award, ShieldCheck, Lock, Plus, Edit2 } from 'lucide-react';

export default function EstatisticasPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('fute_admin_mode') === 'true');
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
    return () => window.removeEventListener('storage', checkAdmin);
  }, []);

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

  const [standings, setStandings] = useState([
    { pos: 1, team: TEAMS.brasil, pts: 6, j: 2, v: 2, e: 0, d: 0, gp: 5, gc: 2, sg: 3 },
    { pos: 2, team: TEAMS.argentina, pts: 4, j: 2, v: 1, e: 1, d: 0, gp: 4, gc: 3, sg: 1 },
    { pos: 3, team: TEAMS.franca, pts: 1, j: 2, v: 0, e: 1, d: 1, gp: 2, gc: 3, sg: -1 },
    { pos: 4, team: TEAMS.alemanha, pts: 0, j: 2, v: 0, e: 0, d: 2, gp: 1, gc: 4, sg: -3 },
  ]);

  const updatePts = (teamId: string, delta: number) => {
    if (!isAdmin) return;
    setStandings((prev) =>
      prev.map((row) => (row.team.id === teamId ? { ...row, pts: Math.max(0, row.pts + delta) } : row))
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-fute-border/60">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-fute-purpleBright" />
            Estatísticas & Classificação
          </h1>
          <p className="text-xs text-fute-purpleLight">
            {isAdmin ? 'Painel Admin de gestão de pontuação e estatísticas.' : 'Visualização da classificação do campeonato (Somente Leitura).'}
          </p>
        </div>

        {isAdmin ? (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Edição Habilitada (ADMIN)
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fute-card border border-fute-border/60 text-purple-300/70 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" /> Edição Restrita ao Organizador
          </span>
        )}
      </div>

      {/* Standings Table */}
      <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-fute-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-fute-gold" />
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
              Tabela de Classificação
            </h2>
          </div>
          {isAdmin && (
            <span className="text-xs text-amber-400 font-bold">Clique em + / - para ajustar pontos</span>
          )}
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
                {isAdmin && <th className="py-3 px-3 text-right">Ação Admin</th>}
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
                  {isAdmin && (
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => updatePts(row.team.id, -1)}
                          className="px-2 py-0.5 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded font-bold"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => updatePts(row.team.id, 1)}
                          className="px-2 py-0.5 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 rounded font-bold"
                        >
                          +1
                        </button>
                      </div>
                    </td>
                  )}
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
            {topScorers.length === 0 ? (
              <p className="text-xs text-purple-300/50 py-4 text-center">Gols serão registrados com o início das partidas.</p>
            ) : (
              topScorers.map((p, idx) => (
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
                    <span>{p.goals || 0}</span>
                    <span className="text-[10px] font-normal">Gols</span>
                  </div>
                </div>
              ))
            )}
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
            {topAssists.length === 0 ? (
              <p className="text-xs text-purple-300/50 py-4 text-center">Assistências serão registradas no torneio.</p>
            ) : (
              topAssists.map((p, idx) => (
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
                    <span>{p.assists || 0}</span>
                    <span className="text-[10px] font-normal">Passes</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
