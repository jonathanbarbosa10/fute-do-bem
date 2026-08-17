'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TeamId, UniformOrder } from '@/lib/types';
import { UniformForm } from '@/components/UniformForm';
import { OrdersList } from '@/components/OrdersList';
import { Shirt, ListFilter } from 'lucide-react';

function UniformeContent() {
  const searchParams = useSearchParams();
  const initialTeam = (searchParams.get('team') as TeamId) || 'brasil';

  const [activeTab, setActiveTab] = useState<'form' | 'orders'>('form');
  const [refreshCount, setRefreshCount] = useState(0);

  const handleOrderCreated = (order: UniformOrder) => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title & Sub-tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-fute-border/60">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Shirt className="w-7 h-7 text-fute-purpleBright" />
            Informações de Uniforme & Pedidos
          </h1>
          <p className="text-xs text-fute-purpleLight">
            Personalize sua camiseta oficial com seu nome, número e tamanho desejado.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-fute-card border border-fute-border/80 rounded-xl">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'form'
                ? 'bg-fute-purpleBright text-white shadow-md'
                : 'text-purple-300/70 hover:text-white'
            }`}
          >
            Novo Pedido / Customizador
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-fute-purpleBright text-white shadow-md'
                : 'text-purple-300/70 hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Pedidos Confirmados</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'form' ? (
        <div className="space-y-8">
          <UniformForm initialTeamId={initialTeam} onOrderCreated={handleOrderCreated} />

          {/* Below Form: Recent Confirmed Orders Section */}
          <div className="pt-4 border-t border-fute-border/40">
            <OrdersList refreshTrigger={refreshCount} />
          </div>
        </div>
      ) : (
        <OrdersList refreshTrigger={refreshCount} />
      )}
    </div>
  );
}

export default function UniformePage() {
  return (
    <Suspense fallback={
      <div className="p-12 text-center text-xs text-fute-purpleLight animate-pulse">
        Carregando portal de uniformes...
      </div>
    }>
      <UniformeContent />
    </Suspense>
  );
}
