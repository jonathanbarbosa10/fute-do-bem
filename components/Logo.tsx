import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const dimensions = {
    sm: { w: 36, h: 36, textSize: 'text-base' },
    md: { w: 48, h: 48, textSize: 'text-xl' },
    lg: { w: 80, h: 80, textSize: 'text-2xl' },
    xl: { w: 140, h: 140, textSize: 'text-3xl' },
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className="relative group flex-shrink-0 flex items-center justify-center"
        style={{ width: dimensions.w, height: dimensions.h }}
      >
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fute-purpleBright to-purple-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300 pointer-events-none" />

        <img
          src="/logo.png"
          alt="Logo Fute do Bem 2026"
          className="relative w-full h-full object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-extrabold tracking-wider bg-gradient-to-r from-white via-purple-200 to-fute-purpleLight bg-clip-text text-transparent ${dimensions.textSize}`}
          >
            FUTE DO BEM
          </span>
          <span className="text-[10px] tracking-widest text-fute-purpleLight/80 uppercase font-semibold mt-0.5">
            Campeonato Beneficente 2026
          </span>
        </div>
      )}
    </div>
  );
};
