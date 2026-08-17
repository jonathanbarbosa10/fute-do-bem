'use client';

import React, { useState, useEffect } from 'react';
import { TeamId, UniformOrder } from '@/lib/types';
import { TEAMS } from '@/lib/data';
import { JerseyPreview } from './JerseyPreview';
import { saveOrUpdateOrder, getMyPlayerOrder } from '@/lib/storage';
import confetti from 'canvas-confetti';
import { Shirt, CheckCircle, Sparkles, User, Hash, Ruler, Phone, Lock, ChevronDown, Edit3, AlertTriangle } from 'lucide-react';

interface UniformFormProps {
  initialTeamId?: TeamId;
  onOrderCreated?: (order: UniformOrder) => void;
}

export const UniformForm: React.FC<UniformFormProps> = ({
  initialTeamId = 'brasil',
  onOrderCreated,
}) => {
  const [teamId, setTeamId] = useState<TeamId>(initialTeamId);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
  
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [playerName, setPlayerName] = useState('');
  const [jerseyName, setJerseyName] = useState('');
  const [number, setNumber] = useState<number | string>(10);
  const [size, setSize] = useState<'P' | 'M' | 'G' | 'GG' | 'XG' | 'XXG'>('G');
  const [position, setPosition] = useState<'Goleiro' | 'Defesa' | 'Meio-campo' | 'Atacante'>('Atacante');
  const [phone, setPhone] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingOrder, setExistingOrder] = useState<UniformOrder | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successOrder, setSuccessOrder] = useState<UniformOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [allSubmittedOrders, setAllSubmittedOrders] = useState<UniformOrder[]>([]);

  const team = TEAMS[teamId];

  // Fetch all orders from central API to lock taken numbers
  const fetchAllOrders = async () => {
    try {
      const res = await fetch('/api/uniforms', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          setAllSubmittedOrders(data.orders);
        }
      }
    } catch (err) {
      console.warn('Could not fetch server orders for number lock:', err);
    }
  };

  // Load existing order on mount & fetch server orders
  useEffect(() => {
    fetchAllOrders();
    const saved = getMyPlayerOrder();
    if (saved) {
      setExistingOrder(saved);
      setOrderId(saved.id);
      setTeamId(saved.teamId);
      setPlayerName(saved.playerName);
      setJerseyName(saved.jerseyName);
      setNumber(saved.number);
      setSize(saved.size);
      setPosition(saved.position);
      setPhone(saved.phone || '');
    }
  }, []);

  // Map of taken numbers in current team (Number -> Player Name)
  const takenNumbersMap = new Map<number, string>();
  allSubmittedOrders
    .filter((o) => o.teamId === teamId && o.id !== orderId && o.playerName.toLowerCase() !== playerName.toLowerCase())
    .forEach((o) => {
      takenNumbersMap.set(o.number, o.playerName);
    });

  const isNumberTaken = takenNumbersMap.has(Number(number));
  const takenByPlayer = takenNumbersMap.get(Number(number));

  // When team changes, pre-select player if not editing existing order
  useEffect(() => {
    if (!isEditing && !existingOrder && team && team.players.length > 0) {
      const firstPlayer = team.players[0];
      setSelectedPlayerId(firstPlayer.id);
      setPlayerName(firstPlayer.name);
      setJerseyName(firstPlayer.name.toUpperCase());
      setNumber(firstPlayer.number);
      setPosition(firstPlayer.position);
    }
  }, [teamId, isEditing, existingOrder]);

  const handlePlayerSelect = (pId: string) => {
    setSelectedPlayerId(pId);
    const p = team.players.find((item) => item.id === pId);
    if (p) {
      setPlayerName(p.name);
      setJerseyName(p.name.toUpperCase());
      setNumber(p.number);
      setPosition(p.position);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!playerName.trim()) {
      setErrorMsg('Por favor, selecione ou informe seu nome completo.');
      return;
    }
    if (!jerseyName.trim()) {
      setErrorMsg('Por favor, informe o nome para estampar na camiseta.');
      return;
    }
    if (!number && number !== 0) {
      setErrorMsg('Por favor, informe o número desejado.');
      return;
    }

    // UNIQUE NUMBER LOCK CHECK FOR SAME TEAM
    const num = Number(number);
    if (takenNumbersMap.has(num)) {
      const takenBy = takenNumbersMap.get(num);
      setErrorMsg(`O número #${num} já foi escolhido por ${takenBy} na Seleção ${team.name}. Escolha outro número.`);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save or Update order
      const newOrder = saveOrUpdateOrder({
        id: orderId,
        teamId,
        playerName: playerName.trim(),
        jerseyName: jerseyName.trim().toUpperCase(),
        number: num,
        size,
        position, // Fixed position from official list
        phone: phone.trim(),
      });

      // 2. Also POST/UPSERT to server API route
      await fetch('/api/uniforms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      // Re-fetch all orders to refresh locks
      await fetchAllOrders();

      // Trigger Celebration Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#facc15', '#38bdf8', '#ffffff'],
        });
      } catch (err) {
        // Confetti fallback
      }

      setSuccessOrder(newOrder);
      setExistingOrder(newOrder);
      setIsEditing(false);

      if (onOrderCreated) {
        onOrderCreated(newOrder);
      }
    } catch (err) {
      console.error('Failed to submit uniform order:', err);
      setErrorMsg('Ocorreu um erro ao salvar o pedido. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
      {/* Form Left Section (7 columns) */}
      <div className="lg:col-span-7 bg-fute-card border border-fute-border/80 rounded-2xl p-4 sm:p-6 shadow-xl relative">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-fute-border/60">
          <div className="p-2 sm:p-2.5 rounded-xl bg-fute-purple/20 border border-fute-purpleLight/30 text-fute-purpleBright flex-shrink-0">
            <Shirt className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-black text-white tracking-wide uppercase">
              Portal do Jogador - Pedido de Kit
            </h2>
            <p className="text-[11px] sm:text-xs text-fute-purpleLight">
              Selecione seu nome da lista oficial, personalize sua camiseta e escolha seu número exclusivo.
            </p>
          </div>
        </div>

        {/* Existing Submitted Order View (If player has order and is not editing) */}
        {existingOrder && !isEditing ? (
          <div className="p-4 sm:p-6 bg-gradient-to-b from-purple-950/60 to-fute-card border border-fute-purpleBright rounded-2xl space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">Seu Kit de Uniforme está Validado!</h3>
                  <span className="text-xs text-purple-200">
                    Seleção: <strong className="text-fute-gold uppercase">{existingOrder.teamId}</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-fute-purple/40 hover:bg-fute-purpleBright text-white text-xs font-bold rounded-xl border border-fute-purpleLight/40 transition-colors shadow-md w-full sm:w-auto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Meu Pedido</span>
              </button>
            </div>

            {/* Summary Details */}
            <div className="p-3.5 sm:p-4 bg-fute-darkBg/90 rounded-xl border border-fute-border/70 text-xs space-y-2">
              <div className="flex justify-between border-b border-fute-border/40 pb-1.5">
                <span className="text-fute-purpleLight">Jogador Convocado:</span>
                <strong className="text-white font-semibold">{existingOrder.playerName}</strong>
              </div>
              <div className="flex justify-between border-b border-fute-border/40 pb-1.5">
                <span className="text-fute-purpleLight">Nome na Camiseta:</span>
                <strong className="text-fute-purpleBright font-mono text-sm">{existingOrder.jerseyName}</strong>
              </div>
              <div className="flex justify-between border-b border-fute-border/40 pb-1.5">
                <span className="text-fute-purpleLight">Número Reservado:</span>
                <strong className="text-emerald-400 font-mono text-sm">#{existingOrder.number} (Exclusivo)</strong>
              </div>
              <div className="flex justify-between border-b border-fute-border/40 pb-1.5">
                <span className="text-fute-purpleLight">Tamanho Escolhido:</span>
                <strong className="text-white px-2 py-0.5 bg-fute-border/50 rounded">{existingOrder.size}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-fute-purpleLight">Posição (Fixa Society):</span>
                <strong className="text-emerald-400 font-bold">{existingOrder.position}</strong>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-950/90 border-2 border-red-500 rounded-xl text-xs text-red-200 font-bold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isEditing && (
              <div className="p-3 bg-purple-900/40 border border-purple-500/40 rounded-xl text-xs text-purple-200 flex items-center justify-between">
                <span>Modo de Edição de Pedido Existente</span>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-[11px] text-purple-300 underline"
                >
                  Cancelar Edição
                </button>
              </div>
            )}

            {/* 1. Seleção do Time */}
            <div>
              <label className="block text-xs font-bold text-purple-200 mb-2 uppercase tracking-wider">
                1. Selecione a sua Seleção
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'brasil', label: 'Brasil', flag: '🇧🇷' },
                  { id: 'argentina', label: 'Argentina', flag: '🇦🇷' },
                  { id: 'franca', label: 'França', flag: '🇫🇷' },
                  { id: 'alemanha', label: 'Alemanha', flag: '🇩🇪' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTeamId(t.id as TeamId)}
                    className={`flex items-center justify-center gap-2 p-2.5 sm:p-3 rounded-xl border text-xs font-bold transition-all ${
                      teamId === t.id
                        ? 'bg-fute-purple/40 border-fute-purpleLight text-white shadow-lg scale-[1.02]'
                        : 'bg-fute-sidebar/60 border-fute-border/50 text-purple-300/70 hover:bg-fute-cardHover hover:text-white'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{t.flag}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Selecionar Nome do Jogador da Lista Oficial */}
            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-fute-purpleBright" />
                  <span>2. Selecione seu Nome no Elenco do {team.name}</span>
                </span>
              </label>

              <div className="relative">
                <select
                  value={selectedPlayerId}
                  onChange={(e) => handlePlayerSelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-3 bg-fute-darkBg border border-fute-purpleBright/50 rounded-xl text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-fute-purpleLight appearance-none"
                >
                  {team.players.map((p) => (
                    <option key={p.id} value={p.id} className="bg-fute-card text-white py-1">
                      {p.name} — ({p.position}) #{p.number}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-fute-purpleLight absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. Nome na Camiseta & Posição Fixa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5 text-fute-purpleBright" />
                    <span>Nome na Camiseta</span>
                  </span>
                  <span className="text-[10px] text-emerald-400">Editável</span>
                </label>
                <input
                  type="text"
                  value={jerseyName}
                  onChange={(e) => setJerseyName(e.target.value.toUpperCase())}
                  placeholder="Ex: RENAN"
                  maxLength={16}
                  className="w-full px-3.5 py-2.5 bg-fute-darkBg border border-fute-border rounded-xl text-white font-mono text-sm uppercase focus:outline-none focus:border-fute-purpleBright transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Posição no Torneio (Fixo)</span>
                </label>
                <div className="w-full px-3.5 py-2.5 bg-fute-sidebar/90 border border-fute-border/70 rounded-xl text-emerald-400 font-bold text-xs sm:text-sm flex items-center justify-between">
                  <span>{position}</span>
                  <span className="text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    Society
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Número Desejado & Trava de Número Repetido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-fute-purpleBright" />
                    <span>Número Desejado</span>
                  </span>
                  <span className="text-[10px] text-amber-300 font-semibold">Sem repetição no time</span>
                </label>

                <input
                  type="number"
                  min="1"
                  max="99"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Ex: 10"
                  className={`w-full px-3.5 py-2.5 bg-fute-darkBg border rounded-xl text-white font-mono text-sm focus:outline-none transition-colors ${
                    isNumberTaken
                      ? 'border-red-500 text-red-300 focus:border-red-400 ring-1 ring-red-500'
                      : 'border-fute-border focus:border-fute-purpleBright'
                  }`}
                  required
                />

                {/* Warning if number is taken by another player */}
                {isNumberTaken && (
                  <div className="mt-1.5 p-2 bg-red-950/90 border border-red-500/80 rounded-lg text-[11px] text-red-300 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>O nº {number} já pertence a {takenByPlayer} no {team.name}. Escolha outro número.</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-fute-purpleBright" />
                  <span>Tamanho do Uniforme</span>
                </label>
                <div className="grid grid-cols-6 gap-1">
                  {(['P', 'M', 'G', 'GG', 'XG', 'XXG'] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSize(sz)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        size === sz
                          ? 'bg-fute-purpleBright text-white shadow-md'
                          : 'bg-fute-darkBg border border-fute-border/60 text-purple-200/70 hover:bg-fute-cardHover hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Telefone WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-fute-purpleBright" />
                <span>WhatsApp para Contato / Avisos</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full px-3.5 py-2.5 bg-fute-darkBg border border-fute-border rounded-xl text-white text-sm focus:outline-none focus:border-fute-purpleBright transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isNumberTaken}
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-fute-purple via-fute-purpleBright to-purple-500 hover:from-purple-600 hover:to-fute-purple text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xl shadow-purple-950/60 uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'SALVANDO SEU KIT...' : isEditing ? 'REENVIAR E ATUALIZAR MEU PEDIDO' : 'CONFIRMAR E SALVAR MEU KIT DE UNIFORME'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Live Preview Right Section (5 columns) */}
      <div className="lg:col-span-5 relative lg:sticky lg:top-24 w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-fute-gold" />
            Pré-visualização do Uniforme
          </span>
        </div>

        <JerseyPreview
          teamId={teamId}
          jerseyName={jerseyName}
          number={number}
          size={size}
          onTeamChange={(t) => setTeamId(t)}
        />
      </div>
    </div>
  );
};
