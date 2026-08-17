'use client';

import React, { useState } from 'react';
import { Heart, Copy, Check, QrCode, ShieldAlert, Sparkles, Gift } from 'lucide-react';

export default function DoacoesPage() {
  const [copied, setCopied] = useState(false);
  const pixKey = '00020126580014BR.GOV.BCB.PIX0136futedobem2024-chave-pix-beneficente-oficial5204000053039865405100.005802BR5925CAMPEONATO FUTE DO BEM6009SAO PAULO62070503***6304E8A2';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const recentDonations = [
    { donor: 'Instituto Ação Comunitária', amount: 3500, time: 'Há 2 horas', msg: 'Sucesso ao torneio!' },
    { donor: 'Kçula Sports', amount: 2000, time: 'Há 5 horas', msg: 'Doação de kits de uniformes completos' },
    { donor: 'Dr. Roberto Santos', amount: 500, time: 'Ontem', msg: 'Pela causa das crianças!' },
    { donor: 'Anonimo', amount: 250, time: 'Ontem', msg: 'Força Brasil!' },
    { donor: 'Família Mendonça', amount: 1000, time: 'Há 2 dias', msg: 'Estamos torcendo pelo evento.' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-3 bg-gradient-to-b from-pink-950/40 via-fute-card to-fute-darkBg p-8 rounded-3xl border border-pink-500/30 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center text-pink-400 shadow-lg animate-pulse">
          <Heart className="w-8 h-8 fill-pink-400" />
        </div>

        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          Causa Beneficente <span className="text-pink-400">Fute do Bem</span>
        </h1>

        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto">
          Toda a renda arrecadada com inscrições, uniformes e doações diretas via Pix será revertida para instituições de apoio a famílias em situação de vulnerabilidade social.
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto pt-4 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-pink-300">Arrecadado: R$ 14.850,00</span>
            <span className="text-fute-purpleLight">Meta: R$ 20.000,00</span>
          </div>
          <div className="w-full h-4 bg-fute-darkBg rounded-full border border-fute-border overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-fute-purpleBright rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: '74%' }}
            />
          </div>
          <span className="text-[11px] text-fute-purpleLight font-semibold block text-center">
            74% da meta atingida! Obrigado a todos os doadores.
          </span>
        </div>
      </div>

      {/* Pix Box & QR Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Copy Pix Key */}
        <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-fute-border/60 pb-3">
            <Gift className="w-5 h-5 text-pink-400" />
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
              Doação Direta via Pix
            </h2>
          </div>

          <p className="text-xs text-fute-purpleLight">
            Copie a chave Pix oficial do evento abaixo ou escaneie o código com seu aplicativo bancário:
          </p>

          <div>
            <label className="block text-[11px] font-bold text-purple-300 mb-1 uppercase">
              Chave Pix (Copia e Cola)
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={pixKey}
                className="w-full pl-3 pr-10 py-3 bg-fute-darkBg border border-fute-border rounded-xl text-xs font-mono text-purple-200 truncate focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-fute-purple hover:bg-fute-purpleBright text-white rounded-lg transition-colors shadow-md"
                title="Copiar Chave Pix"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-emerald-400 font-bold block mt-1">
                ✓ Chave Pix copiada para a área de transferência!
              </span>
            )}
          </div>
        </div>

        {/* Right: QR Code Visualizer */}
        <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center space-y-3">
          <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-fute-purpleBright">
            {/* SVG Stylized QR Code Mockup */}
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
              {/* Outer Position Squares */}
              <rect x="5" y="5" width="25" height="25" fill="#1e102d" />
              <rect x="9" y="9" width="17" height="17" fill="#ffffff" />
              <rect x="13" y="13" width="9" height="9" fill="#8b5cf6" />

              <rect x="70" y="5" width="25" height="25" fill="#1e102d" />
              <rect x="74" y="9" width="17" height="17" fill="#ffffff" />
              <rect x="78" y="13" width="9" height="9" fill="#8b5cf6" />

              <rect x="5" y="70" width="25" height="25" fill="#1e102d" />
              <rect x="9" y="74" width="17" height="17" fill="#ffffff" />
              <rect x="13" y="78" width="9" height="9" fill="#8b5cf6" />

              {/* Random QR Data Dots */}
              <rect x="35" y="10" width="6" height="6" fill="#1e102d" />
              <rect x="45" y="15" width="8" height="8" fill="#8b5cf6" />
              <rect x="35" y="25" width="10" height="5" fill="#1e102d" />

              <rect x="10" y="35" width="8" height="8" fill="#8b5cf6" />
              <rect x="22" y="45" width="6" height="10" fill="#1e102d" />

              <rect x="40" y="40" width="20" height="20" fill="#3b0764" rx="4" />
              <circle cx="50" cy="50" r="6" fill="#ec4899" />

              <rect x="65" y="40" width="8" height="8" fill="#1e102d" />
              <rect x="75" y="55" width="10" height="6" fill="#8b5cf6" />
              <rect x="40" y="70" width="8" height="12" fill="#1e102d" />
              <rect x="55" y="75" width="15" height="8" fill="#8b5cf6" />
              <rect x="75" y="75" width="12" height="12" fill="#1e102d" />
            </svg>
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-fute-purpleBright" />
            QR Code Pix Beneficente
          </span>
        </div>
      </div>

      {/* Recent Supporters */}
      <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-fute-border/60 pb-3">
          <Sparkles className="w-4 h-4 text-fute-gold" />
          Últimos Apoiadores do Evento
        </h3>

        <div className="space-y-2">
          {recentDonations.map((d, i) => (
            <div
              key={i}
              className="p-3 bg-fute-sidebar/80 border border-fute-border/40 rounded-xl flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-white text-xs">{d.donor}</h4>
                {d.msg && <p className="text-[10px] text-fute-purpleLight/80 italic">"{d.msg}"</p>}
              </div>
              <div className="text-right">
                <span className="font-black text-emerald-400 text-xs block">
                  + R$ {d.amount.toLocaleString('pt-BR')}
                </span>
                <span className="text-[10px] text-purple-400/60 font-medium">{d.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
