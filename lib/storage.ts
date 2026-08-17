import { UniformOrder, TeamId } from './types';
import { INITIAL_ORDERS } from './data';

const STORAGE_KEY = 'fute_do_bem_uniform_orders_v1';

export function getStoredOrders(): UniformOrder[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load stored orders:', err);
    return INITIAL_ORDERS;
  }
}

export function saveOrder(order: Omit<UniformOrder, 'id' | 'createdAt' | 'status'>): UniformOrder {
  const currentOrders = getStoredOrders();
  
  const newOrder: UniformOrder = {
    ...order,
    id: 'ord-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
    createdAt: new Date().toISOString().split('T')[0],
    status: 'Pendente',
  };

  const updated = [newOrder, ...currentOrders];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save order to localStorage:', err);
    }
  }

  return newOrder;
}

export function deleteOrder(id: string): boolean {
  const currentOrders = getStoredOrders();
  const updated = currentOrders.filter((o) => o.id !== id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  }
  return true;
}

export function updateOrderStatus(id: string, status: UniformOrder['status']): UniformOrder | null {
  const currentOrders = getStoredOrders();
  let updatedOrder: UniformOrder | null = null;

  const updated = currentOrders.map((o) => {
    if (o.id === id) {
      updatedOrder = { ...o, status };
      return updatedOrder;
    }
    return o;
  });

  if (updatedOrder && typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  }

  return updatedOrder;
}
