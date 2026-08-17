'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shirt, Calendar, Lock, Unlock, ShieldCheck, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Fute do Bem: Campeonato Beneficente',
  subtitle = 'Edição Especial de Uniformes (Society 8x8)',
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('fute_admin_mode') === 'true');
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
  }, []);

  const switchRole = (role: 'player' | 'admin') => {
    if (role === 'player') {
      setIsAdmin(false);
      localStorage.setItem('fute_admin_mode', 'false');
      window.dispatchEvent(new Event('storage'));
      setShowRoleModal(false);
    } else {
      setShowRoleModal(true);
    }
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin' || pinInput === 'futedobem') {
      setIsAdmin(true);
      localStorage.setItem('fute_admin_mode', 'true');
      window.dispatchEvent(new Event('storage'));
      setShowRoleModal(false);
      setPinInput('');
      setErrorMsg('');
    } else {
      setErrorMsg('Senha do organizador incorreta. (Dica padrão: 1234)');
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-fute-darkBg/95 backdrop-blur-md border-b border-fute-border/60 px-6 py-4 flex items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-extrabold text-white tracking-wide">
            {title}
          </h1>
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Futebol Society
          </span>
        </div>
        <p className="text-xs text-fute-purpleLight font-medium">{subtitle}</p>
      </div>

      {/* Center Status Pill */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-fute-card border border-fute-purpleBright/30 text-xs">
        <Calendar className="w-3.5 h-3.5 text-fute-purpleBright" />
        <span className="text-purple-200">Pedidos de Uniforme até:</span>
        <strong className="text-fute-gold font-bold">15 de Outubro</strong>
      </div>

      {/* Right Quick Actions & Role Selector */}
      <div className="flex items-center gap-3">
        <Link
          href="/uniforme"
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-fute-purple to-fute-purpleBright hover:from-purple-600 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/50 transition-all duration-200"
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>Meu Uniforme</span>
        </Link>

        {/* Access Role Switcher Button */}
        <button
          onClick={() => setShowRoleModal(true)}
          className={`flex items-center gap-2 px-3.5 py-2 border rounded-xl text-xs font-bold transition-all shadow-md ${
            isAdmin
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
              : 'bg-fute-card border-fute-purpleBright/40 text-purple-200 hover:text-white hover:bg-fute-cardHover'
          }`}
        >
          {isAdmin ? <ShieldCheck className="w-4 h-4 text-amber-400" /> : <User className="w-4 h-4 text-fute-purpleBright" />}
          <span>{isAdmin ? 'Acesso ADMIN' : 'Acesso JOGADOR'}</span>
        </button>
      </div>

      {/* Access Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-fute-card border border-fute-purpleBright/60 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-fute-purple/30 border border-fute-purpleLight flex items-center justify-center text-fute-purpleBright">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg uppercase text-white">Selecione seu Tipo de Acesso</h3>
              <p className="text-xs text-fute-purpleLight">
                Escolha como deseja navegar pela plataforma do Fute do Bem:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Option 1: Player */}
              <button
                type="button"
                onClick={() => switchRole('player')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                  !isAdmin
                    ? 'bg-fute-purple/30 border-fute-purpleBright text-white ring-2 ring-fute-purpleBright'
                    : 'bg-fute-sidebar/60 border-fute-border/50 text-purple-300/70 hover:bg-fute-cardHover hover:text-white'
                }`}
              >
                <User className="w-6 h-6 text-fute-purpleBright" />
                <div>
                  <h4 className="font-extrabold text-sm text-white">Acesso JOGADOR</h4>
                  <p className="text-[10px] text-fute-purpleLight mt-1">
                    Preencher ou editar meu kit de uniforme e ver a escalação do meu time.
                  </p>
                </div>
              </button>

              {/* Option 2: Admin */}
              <button
                type="button"
                onClick={() => {
                  if (isAdmin) {
                    setShowRoleModal(false);
                  }
                }}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                  isAdmin
                    ? 'bg-amber-500/20 border-amber-500 text-white ring-2 ring-amber-400'
                    : 'bg-fute-sidebar/60 border-fute-border/50 text-purple-300/70 hover:bg-fute-cardHover hover:text-white'
                }`}
              >
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <div>
                  <h4 className="font-extrabold text-sm text-white">Acesso ADMIN</h4>
                  <p className="text-[10px] text-fute-purpleLight mt-1">
                    Gerenciar pedidos para confecção, alterar estatísticas e organizar partidas.
                  </p>
                </div>
              </button>
            </div>

            {/* If Admin PIN needed */}
            {!isAdmin && (
              <form onSubmit={handleAdminAuth} className="pt-2 border-t border-fute-border/40 space-y-3">
                <label className="block text-xs font-bold text-amber-300">
                  Insira a Senha do Organizador para Acesso ADMIN:
                </label>
                {errorMsg && <p className="text-xs text-red-400 font-bold">{errorMsg}</p>}
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Senha (Dica: 1234)"
                    className="flex-1 px-3.5 py-2 bg-fute-darkBg border border-fute-border rounded-xl text-white font-mono text-sm focus:outline-none focus:border-fute-purpleBright"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md"
                  >
                    Entrar Admin
                  </button>
                </div>
              </form>
            )}

            <button
              onClick={() => setShowRoleModal(false)}
              className="w-full py-2.5 bg-fute-border/40 hover:bg-fute-border text-purple-200 text-xs font-bold rounded-xl transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
