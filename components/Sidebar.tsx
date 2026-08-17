'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import {
  Home,
  Users,
  Shirt,
  BarChart3,
  Trophy,
  ChevronRight,
  ShieldCheck,
  User,
  Menu,
  X,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('fute_admin_mode') === 'true');
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
    const interval = setInterval(checkAdmin, 1000);
    return () => {
      window.removeEventListener('storage', checkAdmin);
      clearInterval(interval);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'Página Inicial', href: '/', icon: Home },
    { label: 'Times & Escalações', href: '/times', icon: Users },
    { label: 'Informações de Uniforme', href: '/uniforme', icon: Shirt, highlight: true },
    { label: 'Estatísticas', href: '/estatisticas', icon: BarChart3 },
  ];

  return (
    <>
      {/* ---------------- MOBILE HEADER BAR (Visible on screens < md) ---------------- */}
      <div className="md:hidden sticky top-0 z-40 w-full bg-fute-sidebar border-b border-fute-border/60 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo size="sm" showText={true} />
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-purple-200 hover:text-white bg-fute-card rounded-xl border border-fute-purpleBright/30"
          aria-label="Abrir Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ---------------- MOBILE DRAWER OVERLAY ---------------- */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-5 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-fute-border/60">
            <Logo size="md" />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-purple-200 bg-fute-card rounded-xl border border-fute-purpleBright/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-4 p-3 rounded-xl border bg-fute-card flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isAdmin ? 'bg-amber-500/20 text-amber-300' : 'bg-fute-purple/20 text-fute-purpleLight'}`}>
              {isAdmin ? <ShieldCheck className="w-5 h-5 text-amber-400" /> : <User className="w-5 h-5 text-fute-purpleBright" />}
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                {isAdmin ? 'Acesso ADMIN' : 'Acesso JOGADOR'}
              </h4>
              <span className="text-[10px] text-fute-purpleLight font-medium">
                {isAdmin ? 'Modo Organizador Ativo' : 'Portal do Atleta'}
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 my-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-fute-purple/40 to-fute-purpleBright/30 text-white border border-fute-purpleBright/60 shadow-lg'
                      : 'text-purple-200/80 bg-fute-card/60 hover:bg-fute-cardHover'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-fute-purpleBright' : 'text-purple-300/60'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400/50" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-fute-border/40 text-center">
            <p className="text-xs text-fute-purpleLight/70">Fute do Bem © 2024</p>
            <span className="text-[10px] text-purple-400/60">Uniformes por Kçula Sports</span>
          </div>
        </div>
      )}

      {/* ---------------- DESKTOP SIDEBAR (Visible on screens >= md) ---------------- */}
      <aside className="hidden md:flex w-64 flex-shrink-0 bg-fute-sidebar border-r border-fute-border/60 flex-col justify-between p-4 min-h-screen">
        <div className="flex flex-col gap-6">
          {/* Logo Section */}
          <Link href="/" className="px-2 py-1">
            <Logo size="md" />
          </Link>

          {/* Access Mode Pill */}
          <div className={`mx-2 p-3 rounded-xl border flex items-center gap-3 transition-colors ${
            isAdmin
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              : 'bg-gradient-to-r from-purple-900/40 to-fute-card border-fute-purpleBright/30'
          }`}>
            <div className={`p-2 rounded-lg ${isAdmin ? 'bg-amber-500/20 text-amber-300' : 'bg-fute-purple/20 text-fute-purpleLight'}`}>
              {isAdmin ? <ShieldCheck className="w-5 h-5 text-amber-400" /> : <User className="w-5 h-5 text-fute-purpleBright" />}
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                {isAdmin ? 'Acesso ADMIN' : 'Acesso JOGADOR'}
              </h4>
              <span className="text-[10px] text-fute-purpleLight font-medium">
                {isAdmin ? 'Modo Organizador Ativo' : 'Portal do Atleta'}
              </span>
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
    </>
  );
};
