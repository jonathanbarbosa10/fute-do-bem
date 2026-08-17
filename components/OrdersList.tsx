'use client';

import React, { useState, useEffect } from 'react';
import { UniformOrder } from '@/lib/types';
import { getStoredOrders, deleteOrder } from '@/lib/storage';
import { Shirt, Search, Trash2, Lock, ShieldCheck, RefreshCw, FileSpreadsheet } from 'lucide-react';

interface OrdersListProps {
  refreshTrigger?: number;
}

export const OrdersList: React.FC<OrdersListProps> = ({ refreshTrigger = 0 }) => {
  const [orders, setOrders] = useState<UniformOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch orders from central API / Cloud Database
  const fetchOrdersFromDatabase = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/uniforms', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders(getStoredOrders());
        }
      } else {
        setOrders(getStoredOrders());
      }
    } catch (err) {
      console.warn('Fallback to stored orders:', err);
      setOrders(getStoredOrders());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsAdmin(localStorage.getItem('fute_admin_mode') === 'true');
    fetchOrdersFromDatabase();

    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('fute_admin_mode') === 'true');
    };
    window.addEventListener('storage', checkAdmin);
    return () => window.removeEventListener('storage', checkAdmin);
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (confirm('Tem certeza que deseja cancelar este pedido de uniforme?')) {
      try {
        await fetch(`/api/uniforms?id=${id}`, { method: 'DELETE' });
      } catch (err) {
        deleteOrder(id);
      }
      fetchOrdersFromDatabase();
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.jerseyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.number.toString().includes(searchTerm);
    const matchesTeam = selectedTeam === 'all' || o.teamId === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  // Export directly as a Native Excel/Google Sheets Formatted Spreadsheet (.xls)
  const exportToNativeSpreadsheet = () => {
    if (!isAdmin) return;
    
    const headers = ['ID Pedido', 'Seleção', 'Nome Completo Jogador', 'Nome na Camiseta', 'Número', 'Tamanho', 'Posição', 'WhatsApp / Contato', 'Data de Cadastro'];
    
    const tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Pedidos Uniformes 2026</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          th { background-color: #7c3aed; color: #ffffff; font-weight: bold; font-family: sans-serif; padding: 10px; text-align: left; }
          td { font-family: sans-serif; padding: 8px; border: 1px solid #dddddd; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              ${headers.map((h) => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${filteredOrders.map((o) => `
              <tr>
                <td>${o.id}</td>
                <td>${o.teamId.toUpperCase()}</td>
                <td>${o.playerName}</td>
                <td>${o.jerseyName}</td>
                <td>${o.number}</td>
                <td>${o.size}</td>
                <td>${o.position}</td>
                <td>${o.phone || ''}</td>
                <td>${o.createdAt}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_pedidos_uniformes_2026.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          A lista completa de uniformes encomendados e exportação de relatórios de produção é de acesso exclusivo do **Organizador (Admin)**.
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
            Sincronizado em tempo real • Total de {orders.length} uniformes gravados no banco de dados.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchOrdersFromDatabase}
            disabled={isLoading}
            className="p-2 bg-fute-darkBg hover:bg-fute-border/60 text-purple-200 border border-fute-border rounded-xl transition-all"
            title="Atualizar Dados do Banco"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          <button
            onClick={exportToNativeSpreadsheet}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white text-xs font-extrabold rounded-xl transition-all shadow-md hover:scale-105"
          >
            <FileSpreadsheet className="w-4 h-4 text-white" />
            <span>Baixar Relatório de Produção (.xls)</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
