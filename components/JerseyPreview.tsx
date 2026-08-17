'use client';

import React from 'react';
import { TeamId } from '@/lib/types';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface JerseyPreviewProps {
  teamId: TeamId | string;
  name?: string;
  jerseyName?: string;
  number: number | string;
  size?: string;
  onTeamChange?: (teamId: TeamId) => void;
}

export const JerseyPreview: React.FC<JerseyPreviewProps> = ({
  teamId,
  name,
  jerseyName,
  number,
  size = 'G',
}) => {
  const displayName = jerseyName || name || 'SEU NOME';

  // Robust Kit Image Resolver (handles accents, uppercase, and variations)
  const getKitImage = (id: string) => {
    const normalized = (id || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalized.includes('franc') || normalized === 'franca') return '/kits/franca.png';
    if (normalized.includes('arg') || normalized === 'argentina') return '/kits/argentina.png';
    if (normalized.includes('alem') || normalized === 'alemanha') return '/kits/alemanha.png';
    return '/kits/brasil.jpg';
  };

  const kitImage = getKitImage(teamId);
  const normalizedTeamName = (teamId || 'brasil').toUpperCase();

  return (
    <div className="bg-fute-card border border-fute-border/80 rounded-3xl p-5 shadow-2xl space-y-4 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-fute-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-fute-gold" />
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Modelo de Uniforme Oficial ({normalizedTeamName})
          </h3>
        </div>

        <div className="bg-fute-purple/40 backdrop-blur-md px-3 py-1 rounded-lg border border-fute-purpleLight/40 text-xs font-mono font-extrabold text-white">
          Tamanho: {size}
        </div>
      </div>

      {/* Main Display Box */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-fute-darkBg to-black border border-fute-purpleBright/40 p-4 text-center group">
        {/* Badge Overlay */}
        <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-500/40 text-[10px] font-bold text-amber-300 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Uniforme Oficial 2026</span>
        </div>

        {/* 3D Kit Image */}
        <div className="relative mx-auto max-w-md my-2 flex items-center justify-center min-h-[320px]">
          <img
            key={kitImage}
            src={kitImage}
            alt={`Uniforme Oficial ${teamId}`}
            className="w-full h-auto object-contain rounded-xl drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
          />

          {/* Live Name & Number Badge Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-fute-gold/60 shadow-2xl flex items-center gap-3">
            <span className="font-mono text-xl sm:text-2xl font-black text-fute-gold">
              #{number || '10'}
            </span>
            <div className="text-left border-l border-fute-gold/40 pl-3">
              <span className="text-[9px] uppercase font-bold text-fute-purpleLight block">Nome na Camiseta</span>
              <strong className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider block">
                {displayName}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
