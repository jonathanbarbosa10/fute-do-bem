'use client';

import React, { useState } from 'react';
import { TeamId } from '@/lib/types';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface JerseyPreviewProps {
  teamId: TeamId;
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
  onTeamChange,
}) => {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  const displayName = jerseyName || name || 'SEU NOME';
  const kitImage = teamId === 'franca' ? '/kits/franca.jpg' : `/kits/${teamId}.png`;

  const teamColors: Record<TeamId, { primary: string; numberColor: string; nameColor: string }> = {
    brasil: { primary: '#eab308', numberColor: '#16a34a', nameColor: '#16a34a' },
    argentina: { primary: '#38bdf8', numberColor: '#d97706', nameColor: '#0284c7' },
    alemanha: { primary: '#ffffff', numberColor: '#18181b', nameColor: '#18181b' },
    franca: { primary: '#2563eb', numberColor: '#ffffff', nameColor: '#ffffff' },
  };

  const colors = teamColors[teamId] || teamColors.brasil;

  return (
    <div className="bg-fute-card border border-fute-border/80 rounded-3xl p-5 shadow-2xl space-y-4 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-fute-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-fute-gold" />
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Kit Oficial Kçula Sports ({teamId.toUpperCase()})
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-fute-darkBg p-1 rounded-xl border border-fute-border">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all ${
              viewMode === '3d'
                ? 'bg-gradient-to-r from-fute-purple to-fute-purpleBright text-white shadow'
                : 'text-purple-300/70 hover:text-white'
            }`}
          >
            Modelo 3D Kçula
          </button>
          <button
            type="button"
            onClick={() => setViewMode('2d')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all ${
              viewMode === '2d'
                ? 'bg-gradient-to-r from-fute-purple to-fute-purpleBright text-white shadow'
                : 'text-purple-300/70 hover:text-white'
            }`}
          >
            Simulador 2D
          </button>
        </div>
      </div>

      {/* Main Display Box */}
      {viewMode === '3d' ? (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-fute-darkBg to-black border border-fute-purpleBright/40 p-4 text-center group">
          {/* Badge Sponsor Overlay */}
          <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-500/40 text-[10px] font-bold text-amber-300 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Kçula Sports Oficial</span>
          </div>

          <div className="absolute top-3 right-3 z-10 bg-fute-purple/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-fute-purpleLight/40 text-[10px] font-mono font-extrabold text-white">
            Tam: {size}
          </div>

          {/* 3D Kit Image */}
          <div className="relative mx-auto max-w-md my-2 flex items-center justify-center min-h-[320px]">
            <img
              src={kitImage}
              alt={`Uniforme Oficial Kçula Sports ${teamId}`}
              className="w-full h-auto object-contain rounded-xl drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />

            {/* Live Name & Number Badge Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-fute-gold/60 shadow-2xl flex items-center gap-3">
              <span className="font-mono text-xl sm:text-2xl font-black text-fute-gold">
                #{number || '10'}
              </span>
              <div className="text-left border-l border-fute-gold/40 pl-3">
                <span className="text-[9px] uppercase font-bold text-fute-purpleLight block">Nome Personalizado</span>
                <strong className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider block">
                  {displayName}
                </strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2D Vector Simulator */
        <div className="relative bg-gradient-to-b from-fute-darkBg to-fute-sidebar rounded-2xl p-6 border border-fute-border/60 flex flex-col items-center justify-center min-h-[320px]">
          <div className="relative w-56 h-64 flex flex-col items-center justify-center">
            {/* SVG Jersey Outline */}
            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl">
              {/* Main Body */}
              <path
                d="M 50,40 L 75,20 L 125,20 L 150,40 L 190,65 L 170,105 L 150,90 L 150,220 L 50,220 L 50,90 L 30,105 L 10,65 Z"
                fill={colors.primary}
                stroke="#18181b"
                strokeWidth="3"
              />

              {/* Collar */}
              <path d="M 75,20 Q 100,45 125,20" fill="none" stroke="#ffffff" strokeWidth="4" />

              {/* Logo Emblem */}
              <image href="/logo.png" x="120" y="55" width="22" height="22" />
            </svg>

            {/* Back Jersey Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-8">
              <span
                className="font-black tracking-widest text-xs uppercase drop-shadow-md"
                style={{ color: colors.nameColor }}
              >
                {displayName}
              </span>
              <span
                className="font-mono text-5xl font-black drop-shadow-lg mt-1"
                style={{ color: colors.numberColor }}
              >
                {number || '10'}
              </span>
            </div>
          </div>
        </div>
      )}

      <p className="text-[11px] text-fute-purpleLight text-center italic">
        * Kit impresso com tecido dry-fit profissional Kçula Sports e o escudo oficial Fute do Bem no peito.
      </p>
    </div>
  );
};
