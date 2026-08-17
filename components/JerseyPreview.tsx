'use client';

import React, { useState } from 'react';
import { TeamId } from '@/lib/types';
import { RefreshCw } from 'lucide-react';

interface JerseyPreviewProps {
  teamId: TeamId;
  jerseyName: string;
  number: number | string;
  size?: string;
  onTeamChange?: (teamId: TeamId) => void;
}

export const JerseyPreview: React.FC<JerseyPreviewProps> = ({
  teamId,
  jerseyName,
  number,
  size = 'M',
  onTeamChange,
}) => {
  const [viewMode, setViewMode] = useState<'back' | 'front'>('back');

  const displayName = (jerseyName || 'SEU NOME').toUpperCase();
  const displayNum = number !== undefined && number !== '' ? number : '10';

  // Specific country configurations matching provided images
  const kitConfigs = {
    brasil: {
      name: 'Brasil',
      flagEmoji: '🇧🇷',
      bodyColor: '#facc15', // Vibrant Yellow
      trimColor: '#15803d', // Green
      shortsColor: '#1d4ed8', // Blue
      numberColor: '#15803d', // Green back number
      nameColor: '#15803d',
      pattern: 'brasil-jacquard',
      badgeColor: '#1d4ed8',
    },
    argentina: {
      name: 'Argentina',
      flagEmoji: '🇦🇷',
      bodyColor: '#ffffff',
      trimColor: '#000000',
      shortsColor: '#111827', // Black
      numberColor: '#d97706', // Gold back number
      nameColor: '#d97706',
      pattern: 'stripes-sky',
      badgeColor: '#38bdf8',
    },
    franca: {
      name: 'França',
      flagEmoji: '🇫🇷',
      bodyColor: '#1d4ed8', // Royal Blue
      trimColor: '#dc2626', // Red trim
      shortsColor: '#1d4ed8',
      numberColor: '#ffffff', // White number
      nameColor: '#ffffff',
      pattern: 'solid-blue',
      badgeColor: '#ffffff',
    },
    alemanha: {
      name: 'Alemanha',
      flagEmoji: '🇩🇪',
      bodyColor: '#ffffff', // White
      trimColor: '#000000',
      shortsColor: '#111827', // Black
      numberColor: '#000000', // Black number
      nameColor: '#000000',
      pattern: 'chevron-flag',
      badgeColor: '#000000',
    },
  }[teamId];

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-fute-card to-[#120822] border border-fute-border/80 rounded-2xl shadow-2xl overflow-hidden group">
      {/* Glow Effects */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-fute-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-fute-purpleBright/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / View Toggle */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{kitConfigs.flagEmoji}</span>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{kitConfigs.name}</h4>
            <span className="text-[10px] text-fute-purpleLight font-medium">Kit Oficial 2024</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'back' ? 'front' : 'back')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-fute-border/60 hover:bg-fute-purple/40 text-xs font-semibold text-purple-200 rounded-lg border border-purple-500/30 transition-all duration-200 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Ver {viewMode === 'back' ? 'FRENTE' : 'COSTAS'}</span>
        </button>
      </div>

      {/* Main SVG Jersey Renderer */}
      <div className="relative w-full max-w-[320px] aspect-[4/5] flex items-center justify-center my-2 transition-transform duration-300 transform group-hover:scale-[1.02]">
        <svg
          viewBox="0 0 400 480"
          className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Argentina Sky Blue Stripes Pattern */}
            <pattern id="skyStripes" width="60" height="400" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="30" height="400" fill="#38bdf8" />
              <rect x="30" y="0" width="30" height="400" fill="#ffffff" />
            </pattern>

            {/* Germany Chevron Pattern */}
            <linearGradient id="germanyFlag" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            {/* 3D Fabric Shader */}
            <linearGradient id="fabricShade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* ---------------- SHORTS ---------------- */}
          <g id="shorts">
            {/* Left Leg */}
            <path
              d="M140 330 L110 430 H195 L200 350 Z"
              fill={kitConfigs.shortsColor}
              stroke="#000"
              strokeWidth="2"
            />
            {/* Right Leg */}
            <path
              d="M260 330 L290 430 H205 L200 350 Z"
              fill={kitConfigs.shortsColor}
              stroke="#000"
              strokeWidth="2"
            />
            {/* Waistband */}
            <rect x="135" y="325" width="130" height="15" rx="3" fill="#1e293b" />

            {/* Shorts Number (Left Leg) */}
            <text
              x="145"
              y="410"
              fill="#ffffff"
              fontSize="24"
              fontWeight="900"
              fontFamily="monospace, sans-serif"
            >
              {displayNum}
            </text>
          </g>

          {/* ---------------- JERSEY BODY ---------------- */}
          <g id="jersey-body">
            {/* Main Torso Base */}
            {teamId === 'argentina' ? (
              <path
                d="M110 90 L140 50 H260 L290 90 L275 330 H125 Z"
                fill="url(#skyStripes)"
                stroke="#111"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M110 90 L140 50 H260 L290 90 L275 330 H125 Z"
                fill={kitConfigs.bodyColor}
                stroke="#111"
                strokeWidth="2"
              />
            )}

            {/* Left Sleeve */}
            <path
              d="M140 50 L75 110 L105 160 L128 120 Z"
              fill={teamId === 'argentina' ? '#ffffff' : kitConfigs.bodyColor}
              stroke="#111"
              strokeWidth="2"
            />
            {/* Left Sleeve Trim */}
            <path
              d="M75 110 L105 160 L112 150 L85 105 Z"
              fill={kitConfigs.trimColor}
            />

            {/* Right Sleeve */}
            <path
              d="M260 50 L325 110 L295 160 L272 120 Z"
              fill={teamId === 'argentina' ? '#ffffff' : kitConfigs.bodyColor}
              stroke="#111"
              strokeWidth="2"
            />
            {/* Right Sleeve Trim */}
            <path
              d="M325 110 L295 160 L288 150 L315 105 Z"
              fill={kitConfigs.trimColor}
            />

            {/* ---------------- SPECIAL CHESTRY PATTERNS ---------------- */}
            {/* Germany Chevron Design */}
            {teamId === 'alemanha' && (
              <g id="germany-chevron">
                {/* Chevron Black/Red/Yellow Triangles */}
                <polygon points="120,130 200,190 280,130 280,165 200,225 120,165" fill="#000000" />
                <polygon points="120,150 200,210 280,150 280,175 200,235 120,175" fill="#dc2626" />
                <polygon points="120,165 200,225 280,165 280,185 200,245 120,185" fill="#eab308" />
              </g>
            )}

            {/* France Tricolor Collar */}
            {teamId === 'franca' && (
              <g id="france-collar">
                <polygon points="175,50 200,90 225,50" fill="#ffffff" />
                <polygon points="182,50 200,80 218,50" fill="#dc2626" />
              </g>
            )}

            {/* Brasil Green Side Panels */}
            {teamId === 'brasil' && (
              <g id="brasil-panels">
                <path d="M125 180 Q135 240 125 330 H135 Q145 240 135 180 Z" fill="#15803d" />
                <path d="M275 180 Q265 240 275 330 H265 Q255 240 265 180 Z" fill="#15803d" />
              </g>
            )}

            {/* Collar Base */}
            <path
              d="M170 50 Q200 90 230 50"
              fill="none"
              stroke={kitConfigs.trimColor}
              strokeWidth="8"
            />

            {/* Fabric Shade Layer */}
            <path
              d="M110 90 L140 50 H260 L290 90 L275 330 H125 Z"
              fill="url(#fabricShade)"
            />
          </g>

          {/* ---------------- VIEW MODE: FRONT ---------------- */}
          {viewMode === 'front' && (
            <g id="front-details">
              {/* Event Sponsor Top Header */}
              <text x="200" y="75" textAnchor="middle" fill="#6b7280" fontSize="11" fontWeight="bold">
                Fute do Bem 2024
              </text>

              {/* Fute do Bem Crest (Right Chest) */}
              <g transform="translate(155, 115) scale(0.35)">
                <path d="M50 4 L92 20 V62 C92 90 70 110 50 116 C30 110 8 90 8 62 V20 L50 4 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="4" />
                <path d="M50 82 C50 82 24 64 24 45 C24 35 32 28 41 28 C46 28 49 31 50 33 C51 31 54 28 59 28 C68 28 76 35 76 45 C76 64 50 82 50 82 Z" fill="#c084fc" />
              </g>

              {/* Country Badge (Left Chest) */}
              <g transform="translate(225, 115) scale(0.35)">
                {teamId === 'brasil' && (
                  <g>
                    <rect x="10" y="10" width="80" height="100" rx="10" fill="#002776" stroke="#ffdf00" strokeWidth="4" />
                    <polygon points="50,20 80,60 50,100 20,60" fill="#009c3b" />
                    <circle cx="50" cy="60" r="18" fill="#002776" />
                  </g>
                )}
                {teamId === 'argentina' && (
                  <g>
                    <rect x="10" y="10" width="80" height="100" rx="10" fill="#ffffff" stroke="#74acdf" strokeWidth="4" />
                    <circle cx="50" cy="60" r="22" fill="#f6b40e" />
                  </g>
                )}
                {teamId === 'franca' && (
                  <g>
                    <rect x="10" y="10" width="80" height="100" rx="10" fill="#002395" stroke="#ffffff" strokeWidth="4" />
                    {/* Rooster Symbol */}
                    <path d="M40 70 Q50 30 70 50 T50 80 Z" fill="#ed2939" />
                  </g>
                )}
                {teamId === 'alemanha' && (
                  <g>
                    <circle cx="50" cy="60" r="40" fill="#ffffff" stroke="#000000" strokeWidth="5" />
                    {/* Eagle Symbol */}
                    <path d="M35 50 H65 V70 H35 Z" fill="#000000" />
                  </g>
                )}
              </g>

              {/* Front Small Number */}
              <text
                x="200"
                y="210"
                textAnchor="middle"
                fill={kitConfigs.numberColor}
                fontSize="45"
                fontWeight="900"
                fontFamily="Impact, sans-serif"
                stroke={teamId === 'alemanha' ? '#ffffff' : 'none'}
                strokeWidth="1"
              >
                {displayNum}
              </text>
            </g>
          )}

          {/* ---------------- VIEW MODE: BACK ---------------- */}
          {viewMode === 'back' && (
            <g id="back-details">
              {/* Back Top Sponsor Tag */}
              <text x="200" y="72" textAnchor="middle" fill="#4b5563" fontSize="10" fontWeight="bold" letterSpacing="1">
                Fute do Bem
              </text>

              {/* PLAYER NAME ON JERSEY */}
              <text
                x="200"
                y="130"
                textAnchor="middle"
                fill={kitConfigs.nameColor}
                fontSize="22"
                fontWeight="900"
                letterSpacing="3"
                fontFamily="Impact, sans-serif"
              >
                {displayName}
              </text>

              {/* PLAYER NUMBER ON JERSEY */}
              <text
                x="200"
                y="240"
                textAnchor="middle"
                fill={kitConfigs.numberColor}
                fontSize="110"
                fontWeight="900"
                fontFamily="Impact, sans-serif"
                stroke={teamId === 'alemanha' ? '#ffffff' : 'none'}
                strokeWidth="2"
              >
                {displayNum}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Mini Team Switcher Bar */}
      <div className="w-full flex items-center justify-between gap-1 mt-2 pt-2 border-t border-fute-border/50">
        <span className="text-[11px] text-fute-purpleLight/70 font-medium">Tamanho: <strong className="text-white">{size}</strong></span>

        <div className="flex items-center gap-1.5">
          {(['brasil', 'argentina', 'franca', 'alemanha'] as TeamId[]).map((tId) => {
            const emojis = { brasil: '🇧🇷', argentina: '🇦🇷', franca: '🇫🇷', alemanha: '🇩🇪' };
            const isActive = tId === teamId;
            return (
              <button
                key={tId}
                type="button"
                onClick={() => onTeamChange?.(tId)}
                className={`p-1.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-fute-purpleBright/30 border border-fute-purpleLight scale-110 shadow-lg'
                    : 'bg-fute-card/80 hover:bg-fute-border/50 opacity-60 hover:opacity-100'
                }`}
                title={`Ver uniforme do ${tId}`}
              >
                {emojis[tId]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
