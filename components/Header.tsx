'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shirt, Heart, Calendar, Lock, Unlock, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Fute do Bem: Campeonato Beneficente',
  subtitle = 'Edição Especial de Uniformes (Society 8x8)',
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const savedAdmin = localStorage.getItem('fute_admin_mode');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.setItem('fute_admin_mode', 'false');
    } else {
      setShowPinModal(true);
    }
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin' || pinInput === 'futedobem') {
      setIsAdmin(true);
      localStorage.setItem('fute_admin_mode', 'true');
      setShowPinModal(false);
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

      {/* Right Quick Actions & Admin Lock */}
      <div className="flex items-center gap-3">
        <Link
          href="/uniforme"
          className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-fute-purple to-fute-purpleBright hover:from-purple-600 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/50 transition-all duration-200"
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>Meu Uniforme</span>
        </Link>

        {/* Organizer / Admin Mode Toggle */}
        <button
          onClick={toggleAdmin}
          className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs font-bold transition-all ${
            isAdmin
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-fute-card border-fute-border/60 text-purple-300/70 hover:text-white'
          }`}
          title={isAdmin ? 'Modo Organizador Ativo (Altera informações do torneio)' : 'Acesso Restrito ao Organizador'}
        >
          {isAdmin ? <Unlock className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5" />}
          <span>{isAdmin ? 'Organizador' : 'Acesso Admin'}</span>
        </button>
      </div>

      {/* Admin PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-fute-card border border-fute-purpleBright/60 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-white">
              <Lock className="w-5 h-5 text-fute-gold" />
              <h3 className="font-extrabold text-base uppercase">Área do Organizador</h3>
            </div>
            <p className="text-xs text-fute-purpleLight">
              Digite a senha do organizador para habilitar a edição das demais abas e dados do campeonato.
            </p>

            <form onSubmit={handleAdminAuth} className="space-y-3">
              {errorMsg && <p className="text-xs text-red-400 font-bold">{errorMsg}</p>}
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Senha (Dica: 1234)"
                className="w-full px-3.5 py-2 bg-fute-darkBg border border-fute-border rounded-xl text-white font-mono text-sm focus:outline-none focus:border-fute-purpleBright"
                autoFocus
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-1/2 py-2 bg-fute-border/40 hover:bg-fute-border text-purple-200 text-xs font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-fute-purpleBright hover:bg-purple-600 text-white text-xs font-extrabold rounded-xl shadow-lg"
                >
                  Desbloquear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
