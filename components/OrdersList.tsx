'use client';

import React, { useState, useEffect } from 'react';
import { UniformOrder } from '@/lib/types';
import { getStoredOrders, deleteOrder, updateOrderStatus } from '@/lib/storage';
import { Shirt, Search, Download, Trash2, CheckCircle2, Clock, Factory, Lock, ShieldCheck } from 'lucide-react';

interface OrdersListProps {
  refreshTrigger?: number;
}

export const OrdersList: React.FC<OrdersListProps> = ({ refreshTrigger = 0 }) => {
  const [orders, setOrders] = useState<UniformOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAdmin, setIsAdmin] = useState(false);

  const loadOrders = () => {
    setOrders(getStoredOrders());
    setIsAdmin(localStorage.getItem('fute_admin_mode') === 'true');
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener('storage', loadOrders);
    return () => window.removeEventListener('storage', loadOrders);
  }, [refreshTrigger]);

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    if (confirm('Tem certeza que deseja cancelar este pedido de uniforme?')) {
      deleteOrder(id);
      loadOrders();
    }
  };

  const handleStatusChange = (id: string, status: UniformOrder['status']) => {
    if (!isAdmin) return;
    updateOrderStatus(id, status);
    loadOrders();
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.jerseyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.number.toString().includes(searchTerm);
    const matchesTeam = selectedTeam === 'all' || o.teamId === selectedTeam;
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesTeam && matchesStatus;
  });

  // Export to CSV for clothing manufacturer (Kçula Sports)
  const exportToCSV = () => {
    if (!isAdmin) return;
    const headers = ['ID', 'Time', 'Nome do Jogador', 'Nome na Camiseta', 'Numero', 'Tamanho', 'Posicao', 'Telefone', 'Status', 'Data'];
    const rows = filteredOrders.map((o) => [
      o.id,
      o.teamId.toUpperCase(),
      `"${o.playerName}"`,
      `"${o.jerseyName}"`,
      o.number,
      o.size,
      o.position,
      `"${o.phone || ''}"`,
      o.status,
      o.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pedidos_uniformes_futedobem_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: UniformOrder['status']) => {
    switch (status) {
      case 'Confirmado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Confirmado
          </span>
        );
      case 'Em Confeccao':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Factory className="w-3 h-3" /> Em Produção
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3" /> Pendente
          </span>
        );
    }
  };

  const teamEmojis: Record<string, string> = {
    brasil: '🇧🇷 Brasil',
    argentina: '🇦🇷 Argentina',
    franca: '🇫🇷 França',
    alemanha: '🇩🇪 Alemanha',
  };

  // If not admin, hide management table or show read-only protected notice
  if (!isAdmin) {
    return (
      <div className="bg-fute-card border border-fute-border/80 rounded-2xl p-6 shadow-xl text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
          Pedidos Confirmados para Produção (Acesso Restrito)
        </h3>
        <p className="text-xs text-fute-purpleLight max-w-md mx-auto">
          A lista completa de uniformes encomendados e exportação de relatórios para a confecção é de acesso exclusivo do **Organizador (Admin)**.
        </p>
        <span className="inline-block text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
          Jogadores podem cadastrar ou editar o seu próprio kit no formulário acima.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-fute-card border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Header & Export Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-fute-border/60">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-white uppercase tracking-wider">
              Painel Admin - Pedidos para Produção
            </h3>
          </div>
          <p className="text-xs text-fute-purpleLight">
            Total de {orders.length} uniformes registrados no sistema.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fute-purple to-fute-purpleBright text-white text-xs font-bold rounded-xl transition-all shadow-md hover:scale-105"
        >
          <Download className="w-4 h-4 text-fute-gold" />
          <span>Baixar Relatório (CSV / Kçula)</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por jogador, camisa ou número..."
            className="w-full pl-9 pr-3 py-2 bg-fute-darkBg border border-fute-border rounded-xl text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-fute-purpleBright"
          />
        </div>

        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="px-3 py-2 bg-fute-darkBg border border-fute-border rounded-xl text-xs text-purple-200 focus:outline-none focus:border-fute-purpleBright"
        >
          <option value="all">Todos os Times (🇧🇷 🇦🇷 🇫🇷 🇩🇪)</option>
          <option value="brasil">🇧🇷 Brasil</option>
          <option value="argentina">🇦🇷 Argentina</option>
          <option value="franca">🇫🇷 França</option>
          <option value="alemanha">🇩🇪 Alemanha</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-fute-darkBg border border-fute-border rounded-xl text-xs text-purple-200 focus:outline-none focus:border-fute-purpleBright"
        >
          <option value="all">Todos os Status</option>
          <option value="Pendente">Pendente</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Em Confeccao">Em Produção</option>
        </select>
      </div>

      {/* Table / Grid of Orders */}
      {filteredOrders.length === 0 ? (
        <div className="py-12 text-center text-xs text-purple-300/60 bg-fute-darkBg/50 rounded-xl border border-fute-border/30">
          Nenhum pedido de uniforme encontrado com os filtros selecionados.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-fute-sidebar/80 text-fute-purpleLight uppercase text-[10px] font-bold border-b border-fute-border/60">
              <tr>
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Camiseta</th>
                <th className="py-3 px-3">Nº</th>
                <th className="py-3 px-3">Tamanho</th>
                <th className="py-3 px-3">Jogador</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Ação Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fute-border/40">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-fute-cardHover/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">
                    {teamEmojis[order.teamId] || order.teamId}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-fute-purpleBright">
                    {order.jerseyName}
                  </td>
                  <td className="py-3 px-3 font-mono font-extrabold text-white">
                    #{order.number}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-fute-border/40 font-bold text-white">
                      {order.size}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div>
                      <span className="font-semibold text-white">{order.playerName}</span>
                      {order.phone && <span className="block text-[10px] text-purple-400">{order.phone}</span>}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                      className="bg-fute-darkBg border border-fute-border rounded px-2 py-1 text-[11px] font-bold text-white"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Confirmado">Confirmado</option>
                      <option value="Em Confeccao">Em Produção</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-1.5 text-purple-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                      title="Excluir Pedido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
