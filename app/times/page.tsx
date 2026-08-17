'use client';

import React, { useState } from 'react';
import { TEAMS } from '@/lib/data';
import { TeamId } from '@/lib/types';
import { TacticalPitch } from '@/components/TacticalPitch';
import { CountryBadge } from '@/components/CountryBadge';
import Link from 'next/link';
import { Users, Shirt, Search, Crown, Activity } from 'lucide-react';

export default function TimesPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<TeamId>('brasil');
  const [searchPlayer, setSearchPlayer] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');

  const team = TEAMS[selectedTeamId];

  const filteredPlayers = team.players.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(searchPlayer.toLowerCase()) || p.number.toString().includes(searchPlayer);
    const matchesPos = selectedPosition === 'all' || p.position === selectedPosition;
    return matchesName && matchesPos;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-fute-border/60">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Users className="w-7 h-7 text-fute-purpleBright" />
            Times & Escalações Táticas (Society 8x8)
          </h1>
          <p className="text-xs text-fute-purpleLight">
            Explore o elenco e a formação tática de cada uma das 4 seleções participantes.
          </p>
        </div>

        <Link
          href={`/uniforme?team=${selectedTeamId}`}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-fute-purple to-fute-purpleBright text-white text-xs font-bold rounded-xl shadow-lg hover:scale-105 transition-all w-full sm:w-auto justify-center"
        >
          <Shirt className="w-4 h-4" />
          <span>Pedir Uniforme do {team.name}</span>
        </Link>
      </div>

      {/* Team Tabs Switcher (Flags placed BEFORE team names) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['brasil', 'argentina', 'franca', 'alemanha'] as TeamId[]).map((tId) => {
          const t = TEAMS[tId];
          const isActive = tId === selectedTeamId;
          return (
            <button
              key={tId}
              onClick={() => setSelectedTeamId(tId)}
              className={`p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                isActive
                  ? 'bg-fute-card border-fute-purpleBright/80 text-white shadow-xl scale-[1.02] ring-2 ring-fute-purpleBright/50'
                  : 'bg-fute-sidebar/60 border-fute-border/50 text-purple-300/70 hover:bg-fute-cardHover hover:text-white'
              }`}
            >
              {/* Flag Badge placed BEFORE team name */}
              <CountryBadge teamId={tId} size="sm" />

              <div className="text-left">
                <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider">{t.name}</h3>
                <span className="text-[10px] text-fute-purpleLight font-medium block">
                  {t.totalPlayers} Convocados
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Pitch Layout (Left) vs Player Roster (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Tactical Pitch View (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>{team.flagEmoji}</span>
              <span>Escalação no Campo ({team.name})</span>
            </h3>
            <span className="text-[11px] text-fute-purpleLight">Clique nos jogadores no campo</span>
          </div>

          <TacticalPitch team={team} />
        </div>

        {/* Player Roster List (5 columns) */}
        <div className="lg:col-span-5 bg-fute-card border border-fute-border/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-fute-border/60">
            <div className="flex items-center gap-3">
              {/* Flag Badge placed BEFORE team name */}
              <CountryBadge teamId={team.id} size="sm" />
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                  Elenco ({team.name})
                </h3>
                <p className="text-xs text-fute-purpleLight">Capitão: <strong className="text-fute-gold">{team.captain}</strong></p>
              </div>
            </div>
          </div>

          {/* Search & Position Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-purple-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchPlayer}
                onChange={(e) => setSearchPlayer(e.target.value)}
                placeholder="Buscar jogador..."
                className="w-full pl-8 pr-2 py-1.5 bg-fute-darkBg border border-fute-border rounded-lg text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-fute-purpleBright"
              />
            </div>

            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="px-2 py-1.5 bg-fute-darkBg border border-fute-border rounded-lg text-xs text-purple-200 focus:outline-none focus:border-fute-purpleBright"
            >
              <option value="all">Todas Posições</option>
              <option value="Goleiro">Goleiro</option>
              <option value="Defesa">Defensores</option>
              <option value="Meio-campo">Meio-Campistas</option>
              <option value="Atacante">Atacantes</option>
            </select>
          </div>

          {/* Player Cards Scrollable Container */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="p-2.5 sm:p-3 bg-fute-sidebar/80 border border-fute-border/40 hover:border-fute-purpleBright/50 rounded-xl flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-fute-purple/20 border border-fute-purpleLight/40 flex items-center justify-center font-mono font-extrabold text-white text-xs">
                    #{player.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-xs">{player.name}</h4>
                      {player.isCaptain && (
                        <span className="flex items-center gap-0.5 text-[9px] font-extrabold text-amber-300 bg-amber-500/20 px-1 py-0.5 rounded border border-amber-500/30">
                          <Crown className="w-2.5 h-2.5" /> Cap
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-fute-purpleLight/70">{player.position}</span>
                  </div>
                </div>

                <Link
                  href={`/uniforme?team=${team.id}&name=${encodeURIComponent(player.name)}&num=${player.number}`}
                  className="px-2.5 py-1 bg-fute-border/40 hover:bg-fute-purpleBright text-purple-200 hover:text-white text-[10px] font-bold rounded-lg transition-colors"
                >
                  Pedir Kit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
