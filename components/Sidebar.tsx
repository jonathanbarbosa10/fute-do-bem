'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import {
  Home,
  Users,
  Shirt,
  BarChart3,
  Heart,
  Trophy,
  ChevronRight,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Página Inicial', href: '/', icon: Home },
    { label: 'Times & Escalações', href: '/times', icon: Users },
    { label: 'Informações de Uniforme', href: '/uniforme', icon: Shirt, highlight: true },
    { label: 'Estatísticas', href: '/estatisticas', icon: BarChart3 },
    { label: 'Doações', href: '/doacoes', icon: Heart },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-fute-sidebar border-r border-fute-border/60 flex flex-col justify-between p-4 min-h-screen">
      <div className="flex flex-col gap-6">
        {/* Logo Section */}
        <Link href="/" className="px-2 py-1">
          <Logo size="md" />
        </Link>

        {/* Tournament Badge */}
        <div className="mx-2 p-3 rounded-xl bg-gradient-to-r from-purple-900/40 to-fute-card border border-fute-purpleBright/30 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-fute-purple/20 text-fute-purpleLight">
            <Trophy className="w-5 h-5 text-fute-gold" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Edição Beneficente</h4>
            <span className="text-[10px] text-fute-purpleLight font-medium">4 Seleções Globais</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-fute-purple/30 to-fute-purpleBright/20 text-white border border-fute-purpleBright/50 shadow-lg shadow-purple-950/40'
                    : 'text-purple-200/70 hover:text-white hover:bg-fute-cardHover'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-fute-purpleBright' : 'text-purple-300/50 group-hover:text-purple-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-fute-purpleBright animate-pulse" />
                )}

                {isActive && <ChevronRight className="w-4 h-4 text-fute-purpleLight" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="px-3 py-3 border-t border-fute-border/40 text-center">
        <p className="text-[11px] text-fute-purpleLight/60">
          Fute do Bem © 2024
        </p>
        <span className="text-[10px] text-purple-400/50 block mt-0.5">
          Uniformes por Kçula Sports
        </span>
      </div>
    </aside>
  );
};
