'use client';

import React from 'react';
import Link from 'next/link';
import { TEAMS } from '@/lib/data';
import { TeamCard } from '@/components/TeamCard';
import { Shirt, Users, Calendar, Trophy, ArrowRight, Sparkles, MapPin, Clock, HelpCircle } from 'lucide-react';

export default function OverviewPage() {
  const teamsList = Object.values(TEAMS);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Event Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-fute-card to-fute-sidebar border border-fute-purpleBright/40 p-5 sm:p-8 shadow-2xl">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-fute-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-fute-purpleBright/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fute-purple/30 border border-fute-purpleLight/40 text-xs font-bold text-fute-purpleLight">
              <Sparkles className="w-3.5 h-3.5 text-fute-gold" />
              <span>Edição Beneficente 2026</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Campeonato Beneficente <span className="bg-gradient-to-r from-fute-purpleLight via-white to-purple-300 bg-clip-text text-transparent">Fute do Bem 2026</span>
            </h1>

            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Bem-vindo ao portal oficial do torneio! Acompanhe as escalações das 4 seleções no formato Futebol Society (Brasil, Argentina, França e Alemanha), veja os convocados e encomende o seu kit de uniforme personalizado.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/uniforme"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-fute-purple via-fute-purpleBright to-purple-500 hover:from-purple-600 hover:to-fute-purple text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-purple-950/60 transition-all transform hover:scale-105"
              >
                <Shirt className="w-4 h-4" />
                <span>Cadastrar Meu Uniforme</span>
              </Link>

              <Link
                href="/times"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-fute-card hover:bg-fute-cardHover border border-fute-purpleBright/40 text-purple-200 hover:text-white font-bold text-xs rounded-xl transition-all"
              >
                <Users className="w-4 h-4 text-fute-purpleBright" />
                <span>Ver Escalações Táticas</span>
              </Link>
            </div>
          </div>

          {/* Banner Quick Stats Badges */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-fute-darkBg/80 border border-fute-border/60 text-center">
              <span className="text-xl sm:text-2xl font-black text-white block">4</span>
              <span className="text-[10px] sm:text-[11px] text-fute-purpleLight font-semibold">Seleções</span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-fute-darkBg/80 border border-fute-border/60 text-center">
              <span className="text-xl sm:text-2xl font-black text-fute-gold block">39</span>
              <span className="text-[10px] sm:text-[11px] text-fute-purpleLight font-semibold">Convocados</span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-fute-darkBg/80 border border-fute-border/60 text-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">Society</span>
              <span className="text-[10px] sm:text-[11px] text-fute-purpleLight font-semibold">1 Gol + 7 Linha</span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-fute-darkBg/80 border border-fute-border/60 text-center">
              <span className="text-xl sm:text-2xl font-black text-fute-purpleBright block">Kçula</span>
              <span className="text-[10px] sm:text-[11px] text-fute-purpleLight font-semibold">Uniformes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Event Details Box (Data, Horário, Local) */}
      <div className="bg-gradient-to-r from-fute-card via-purple-950/40 to-fute-sidebar border border-fute-gold/40 rounded-2xl p-5 shadow-xl">
        <h3 className="text-xs font-black text-fute-gold uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-fute-gold" />
          Informações Oficiais do Grande Dia (2026)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Data & Horário */}
          <div className="flex items-center gap-3 p-3 bg-fute-darkBg/70 rounded-xl border border-fute-border/40">
            <div className="p-2.5 rounded-lg bg-fute-purple/20 text-fute-purpleLight">
              <Calendar className="w-5 h-5 text-fute-gold" />
            </div>
            <div>
              <span className="text-[10px] text-fute-purpleLight uppercase font-bold block">Data do Evento</span>
              <strong className="text-xs sm:text-sm text-white">15 de Novembro de 2026</strong>
              <span className="text-[11px] text-purple-300 block">Das 12:00 às 17:00</span>
            </div>
          </div>

          {/* Local */}
          <div className="flex items-center gap-3 p-3 bg-fute-darkBg/70 rounded-xl border border-fute-border/40">
            <div className="p-2.5 rounded-lg bg-fute-purple/20 text-fute-purpleLight">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] text-fute-purpleLight uppercase font-bold block">Local das Partidas</span>
              <strong className="text-xs sm:text-sm text-white">CETA</strong>
              <span className="text-[11px] text-purple-300 block">Bragança Paulista - SP</span>
            </div>
          </div>

          {/* Prazo Uniformes */}
          <div className="flex items-center gap-3 p-3 bg-fute-darkBg/70 rounded-xl border border-fute-border/40">
            <div className="p-2.5 rounded-lg bg-fute-purple/20 text-fute-purpleLight">
              <Shirt className="w-5 h-5 text-fute-purpleBright" />
            </div>
            <div>
              <span className="text-[10px] text-fute-purpleLight uppercase font-bold block">Prazo de Uniformes</span>
              <strong className="text-xs sm:text-sm text-fute-gold">Até 30 de Agosto</strong>
              <span className="text-[11px] text-purple-300 block">Para Confecção do Kit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Header: Visão Geral dos Times */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-wider uppercase flex items-center gap-2">
              <Trophy className="w-5 h-5 text-fute-gold" />
              Visão Geral dos Times
            </h2>
            <p className="text-xs text-fute-purpleLight">
              Selecione uma seleção para ver a lista de jogadores e informações de uniforme.
            </p>
          </div>

          <Link
            href="/times"
            className="flex items-center gap-1 text-xs font-bold text-fute-purpleBright hover:text-white transition-colors"
          >
            <span>Ver em detalhe</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Teams 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {teamsList.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      {/* Matches Schedule Section (A definir para os 2 jogos) */}
      <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-fute-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-fute-purpleBright" />
            <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
              Próximos Confrontos Beneficentes (Mata-Mata)
            </h3>
          </div>
          <span className="text-xs text-fute-gold font-bold">CETA — Bragança Paulista</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Semi-Final 1 */}
          <div className="p-4 rounded-xl bg-fute-sidebar/80 border border-fute-border/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-fute-purpleLight border-b border-fute-border/30 pb-2">
              <span>Semi-Final 1</span>
              <span className="text-fute-gold font-semibold">15/11/2026 — A definir</span>
            </div>

            <div className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <HelpCircle className="w-6 h-6 text-purple-400" />
                <span>A definir</span>
              </div>

              <div className="text-center px-3 py-1 bg-fute-purple/20 rounded-full border border-fute-purpleLight/30 text-xs font-black text-fute-purpleBright">
                VS
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <span>A definir</span>
                <HelpCircle className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Semi-Final 2 */}
          <div className="p-4 rounded-xl bg-fute-sidebar/80 border border-fute-border/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-fute-purpleLight border-b border-fute-border/30 pb-2">
              <span>Semi-Final 2</span>
              <span className="text-fute-gold font-semibold">15/11/2026 — A definir</span>
            </div>

            <div className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <HelpCircle className="w-6 h-6 text-purple-400" />
                <span>A definir</span>
              </div>

              <div className="text-center px-3 py-1 bg-fute-purple/20 rounded-full border border-fute-purpleLight/30 text-xs font-black text-fute-purpleBright">
                VS
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <span>A definir</span>
                <HelpCircle className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
