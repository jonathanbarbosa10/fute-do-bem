import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const dimensions = {
    sm: { w: 36, h: 42, textSize: 'text-base' },
    md: { w: 48, h: 56, textSize: 'text-xl' },
    lg: { w: 72, h: 84, textSize: 'text-2xl' },
    xl: { w: 100, h: 116, textSize: 'text-3xl' },
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative group flex-shrink-0" style={{ width: dimensions.w, height: dimensions.h }}>
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fute-purpleBright rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>

        <svg
          viewBox="0 0 100 120"
          className="relative w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Shield Gradient */}
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b0764" />
              <stop offset="50%" stopColor="#1e102d" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            {/* Shield Border Metallic */}
            <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#e9d5ff" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>

            {/* Heart Gradient */}
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>

            {/* Ball Glow */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Shield Outer Shadow Path */}
          <path
            d="M50 4 L92 20 V62 C92 90 70 110 50 116 C30 110 8 90 8 62 V20 L50 4 Z"
            fill="url(#shieldGrad)"
            stroke="url(#shieldBorder)"
            strokeWidth="4"
          />

          {/* Inner Shield Ribbing Line */}
          <path
            d="M50 10 L84 24 V60 C84 84 66 102 50 108 C34 102 16 84 16 60 V24 L50 10 Z"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.6"
          />

          {/* Heart Emblem */}
          <path
            d="M50 82 C50 82 24 64 24 45 C24 35 32 28 41 28 C46 28 49 31 50 33 C51 31 54 28 59 28 C68 28 76 35 76 45 C76 64 50 82 50 82 Z"
            fill="url(#heartGrad)"
            stroke="#ffffff"
            strokeWidth="1.5"
          />

          {/* Soccer Ball Pattern Inside Heart */}
          <g filter="url(#glow)">
            {/* Soccer Ball Circle */}
            <circle cx="50" cy="50" r="14" fill="#ffffff" stroke="#3b0764" strokeWidth="1.5" />

            {/* Pentagon Center */}
            <polygon points="50,44 54,47 53,52 47,52 46,47" fill="#3b0764" />

            {/* Pentagon Spoke Lines */}
            <line x1="50" y1="44" x2="50" y2="36" stroke="#3b0764" strokeWidth="1.2" />
            <line x1="54" y1="47" x2="61" y2="44" stroke="#3b0764" strokeWidth="1.2" />
            <line x1="53" y1="52" x2="59" y2="58" stroke="#3b0764" strokeWidth="1.2" />
            <line x1="47" y1="52" x2="41" y2="58" stroke="#3b0764" strokeWidth="1.2" />
            <line x1="46" y1="47" x2="39" y2="44" stroke="#3b0764" strokeWidth="1.2" />
          </g>

          {/* Banner Ribbon */}
          <path
            d="M10 92 Q50 102 90 92 L86 100 Q50 110 14 100 Z"
            fill="#7e22ce"
            stroke="#e9d5ff"
            strokeWidth="1"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-extrabold tracking-wider bg-gradient-to-r from-white via-purple-200 to-fute-purpleLight bg-clip-text text-transparent ${dimensions.textSize}`}>
            FUTE DO BEM
          </span>
          <span className="text-[10px] tracking-widest text-fute-purpleLight/80 uppercase font-semibold mt-0.5">
            Campeonato Beneficente
          </span>
        </div>
      )}
    </div>
  );
};
