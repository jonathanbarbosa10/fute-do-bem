'use client';

import React from 'react';
import Link from 'next/link';
import { Shirt, Heart, Calendar, Search, Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Fute do Bem: Campeonato Beneficente',
  subtitle = 'Edição Especial de Uniformes',
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-fute-darkBg/90 backdrop-blur-md border-b border-fute-border/60 px-6 py-4 flex items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-lg font-extrabold text-white tracking-wide flex items-center gap-2">
          {title}
        </h1>
        <p className="text-xs text-fute-purpleLight font-medium">{subtitle}</p>
      </div>

      {/* Center Status Pill */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-fute-card border border-fute-purpleBright/30 text-xs">
        <Calendar className="w-3.5 h-3.5 text-fute-purpleBright" />
        <span className="text-purple-200">Pedidos de Uniforme até:</span>
        <strong className="text-fute-gold font-bold">15 de Outubro</strong>
      </div>

      {/* Right Quick Actions & User Avatar */}
      <div className="flex items-center gap-3">
        <Link
          href="/uniforme"
          className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-fute-purple to-fute-purpleBright hover:from-purple-600 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/50 transition-all duration-200"
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>Meu Uniforme</span>
        </Link>

        <Link
          href="/doacoes"
          className="flex items-center gap-1.5 px-3 py-2 bg-fute-card hover:bg-fute-cardHover border border-fute-purpleBright/40 text-purple-200 font-bold text-xs rounded-xl transition-all duration-200"
        >
          <Heart className="w-3.5 h-3.5 text-pink-400" />
          <span>Doar</span>
        </Link>

        {/* User Profile Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-fute-purple to-fute-purpleBright p-0.5 shadow-md cursor-pointer">
          <div className="w-full h-full rounded-full bg-fute-card flex items-center justify-center font-bold text-white text-xs">
            FB
          </div>
        </div>
      </div>
    </header>
  );
};
