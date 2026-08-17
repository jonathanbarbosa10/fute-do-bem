'use client';

import React, { useState } from 'react';
import { Team } from '@/lib/types';
import { CountryBadge } from './CountryBadge';
import Link from 'next/link';
import { Shirt, Users, ChevronDown, ChevronUp, Crown } from 'lucide-react';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getKitImage = (id: string) => {
    const normalized = (id || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalized.includes('franc') || normalized === 'franca') return '/kits/franca.png';
    if (normalized.includes('arg') || normalized === 'argentina') return '/kits/argentina.png';
    if (normalized.includes('alem') || normalized === 'alemanha') return '/kits/alemanha.png';
    return '/kits/brasil.jpg';
  };

  const kitImage = getKitImage(team.id);

  return (
    <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-fute-purpleBright/60 hover:shadow-2xl group relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-fute-purple/10 rounded-full blur-2xl pointer-events-none" />

      {/* Card Top: Country Badge & Summary */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Country Badge Shield Logo */}
            <CountryBadge teamId={team.id} size="md" />

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white uppercase tracking-wider">
                  {team.name}
                </h3>
                <span className="text-xl">{team.flagEmoji}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-fute-purpleLight font-medium mt-0.5">
                <span className="flex items-center gap-1 text-purple-200">
                  <Users className="w-3 h-3 text-fute-purpleBright" />
                  {team.totalPlayers} jogadores
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-fute-gold font-semibold">
                  <Crown className="w-3 h-3" />
                  Capitão: {team.captain}
                </span>
              </div>
            </div>
          </div>

          <Link
            href={`/uniforme?team=${team.id}`}
            className="p-2.5 rounded-xl bg-fute-purple/20 hover:bg-fute-purpleBright/40 text-fute-purpleLight hover:text-white border border-fute-purpleBright/30 transition-all duration-200 shadow-md shrink-0"
            title={`Pedir uniforme do ${team.name}`}
          >
            <Shirt className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D Kit Image Thumbnail + Description */}
        <div className="flex items-center gap-3 bg-fute-darkBg/80 p-3 rounded-xl border border-fute-border/50 mb-4">
          <img
            src={kitImage}
            alt={`Uniforme ${team.name}`}
            className="w-16 h-16 object-contain rounded-lg shrink-0 border border-fute-border/40 bg-black/40 p-1"
          />
          <p className="text-xs text-purple-200/80 leading-snug">
            {team.kitDescription}
          </p>
        </div>

        {/* Players List Preview */}
        <div className="space-y-1.5 overflow-hidden">
          {(isExpanded ? team.players : team.players.slice(0, 5)).map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-fute-sidebar/70 border border-fute-border/30 text-xs hover:bg-fute-cardHover transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 font-mono font-bold text-fute-purpleBright text-center">
                  #{player.number}
                </span>
                <span className="font-semibold text-purple-100">{player.name}</span>
                {player.isCaptain && (
                  <span className="text-[9px] font-extrabold text-amber-400 bg-amber-400/10 px-1 py-0.5 rounded border border-amber-400/30">
                    Capitão
                  </span>
                )}
              </div>
              <span className="text-[10px] text-fute-purpleLight/70 font-medium px-2 py-0.5 bg-fute-border/40 rounded">
                {player.position}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Expand Button */}
      {team.players.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full py-2 flex items-center justify-center gap-1.5 text-xs font-bold text-fute-purpleLight hover:text-white bg-fute-border/30 hover:bg-fute-border/60 rounded-xl transition-colors"
        >
          <span>{isExpanded ? 'Recolher Elenco' : `Ver todos os ${team.players.length} convocados`}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
};
