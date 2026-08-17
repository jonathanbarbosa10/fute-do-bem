'use client';

import React, { useState, useEffect } from 'react';
import { TEAMS } from '@/lib/data';
import { BarChart3, Trophy, Flame, Award, ShieldCheck, Lock, HelpCircle, Swords, Medal } from 'lucide-react';

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

  // Aggregate Top Scorers across all 4 teams (starting clean)
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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-fute-border/60">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-fute-purpleBright" />
            Estatísticas & Chaveamento Mata-Mata
          </h1>
          <p className="text-xs text-fute-purpleLight">
            Chave oficial do torneio com Semi-Finais, Disputa de 3º Lugar e a Grande Final.
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

      {/* TOURNAMENT BRACKET (CHAVE MATA-MATA) */}
      <div className="bg-fute-card border border-fute-border/80 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-fute-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <Swords className="w-6 h-6 text-fute-gold" />
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
              Chave do Torneio (Mata-Mata)
            </h2>
          </div>
          <span className="text-xs font-extrabold text-fute-purpleBright bg-fute-purple/20 px-3 py-1 rounded-full border border-fute-purpleLight/30">
            Fase Final
          </span>
        </div>

        {/* Bracket Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative">
          {/* Column 1: Semi-Finais */}
          <div className="space-y-6">
            <h3 className="text-xs font-extrabold text-fute-purpleLight uppercase tracking-wider text-center border-b border-fute-border/40 pb-2">
              Semi-Finais (SF)
            </h3>

            {/* SF 1 */}
            <div className="p-4 rounded-2xl bg-fute-sidebar/90 border border-fute-border/60 shadow-lg space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-fute-purpleLight border-b border-fute-border/30 pb-1.5">
                <span>SEMI-FINAL 1</span>
                <span className="text-fute-gold">A definir</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-fute-darkBg/80 border border-fute-border/40 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                    <span>A definir</span>
                  </div>
                  <span className="font-mono text-purple-300">-</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-fute-darkBg/80 border border-fute-border/40 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                    <span>A definir</span>
                  </div>
                  <span className="font-mono text-purple-300">-</span>
                </div>
              </div>
            </div>

            {/* SF 2 */}
            <div className="p-4 rounded-2xl bg-fute-sidebar/90 border border-fute-border/60 shadow-lg space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-fute-purpleLight border-b border-fute-border/30 pb-1.5">
                <span>SEMI-FINAL 2</span>
                <span className="text-fute-gold">A definir</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-fute-darkBg/80 border border-fute-border/40 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                    <span>A definir</span>
                  </div>
                  <span className="font-mono text-purple-300">-</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-fute-darkBg/80 border border-fute-border/40 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                    <span>A definir</span>
                  </div>
                  <span className="font-mono text-purple-300">-</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Disputa de 3º Lugar */}
          <div className="space-y-6">
            <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider text-center border-b border-fute-border/40 pb-2 flex items-center justify-center gap-1.5">
              <Medal className="w-4 h-4 text-amber-500" />
              <span>Disputa de 3º Lugar</span>
            </h3>

            <div className="p-4 rounded-2xl bg-fute-sidebar/90 border border-amber-500/30 shadow-lg space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 border-b border-fute-border/30 pb-1.5">
                <span>3º LUGAR</span>
                <span>A definir</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-fute-darkBg/80 border border-fute-border/40 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Perdedor SF1</span>
                  </div>
                  <span className="font-mono text-purple-300">-</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-fute-darkBg/80 border border-fute-border/40 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Perdedor SF2</span>
                  </div>
                  <span className="font-mono text-purple-300">-</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Grande Final */}
          <div className="space-y-6">
            <h3 className="text-xs font-extrabold text-fute-gold uppercase tracking-wider text-center border-b border-fute-border/40 pb-2 flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-fute-gold" />
              <span>Grande Final</span>
            </h3>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-900/60 to-fute-card border-2 border-fute-gold/80 shadow-2xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-fute-gold/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-black text-fute-gold border-b border-fute-gold/30 pb-2">
                <span className="flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> FINALÍSSIMA
                </span>
                <span>A definir</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-fute-darkBg/90 border border-fute-gold/40 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-fute-gold" />
                    <span>Vencedor SF1</span>
                  </div>
                  <span className="font-mono text-fute-gold text-sm font-black">-</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-fute-darkBg/90 border border-fute-gold/40 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-fute-gold" />
                    <span>Vencedor SF2</span>
                  </div>
                  <span className="font-mono text-fute-gold text-sm font-black">-</span>
                </div>
              </div>
            </div>
          </div>
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
              <p className="text-xs text-purple-300/60 py-6 text-center italic">
                Aguardando o início dos jogos para registro de gols.
              </p>
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
              <p className="text-xs text-purple-300/60 py-6 text-center italic">
                Aguardando o início dos jogos para registro de passes.
              </p>
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
