import { UniformOrder, TeamId } from './types';
import { INITIAL_ORDERS } from './data';

const STORAGE_KEY = 'fute_do_bem_uniform_orders_v2';
const PLAYER_ORDER_KEY = 'fute_do_bem_my_player_order_id';

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

export function getMyPlayerOrder(): UniformOrder | null {
  if (typeof window === 'undefined') return null;
  try {
    const orderId = localStorage.getItem(PLAYER_ORDER_KEY);
    if (!orderId) return null;
    const orders = getStoredOrders();
    return orders.find((o) => o.id === orderId) || null;
  } catch (err) {
    return null;
  }
}

export function saveOrUpdateOrder(
  orderData: Omit<UniformOrder, 'id' | 'createdAt' | 'status'> & { id?: string }
): UniformOrder {
  const currentOrders = getStoredOrders();
  const now = new Date().toISOString().split('T')[0];

  let existingIndex = -1;
  if (orderData.id) {
    existingIndex = currentOrders.findIndex((o) => o.id === orderData.id);
  } else {
    // Check if player name already exists in current orders
    existingIndex = currentOrders.findIndex(
      (o) => o.playerName.toLowerCase() === orderData.playerName.toLowerCase() && o.teamId === orderData.teamId
    );
  }

  let finalOrder: UniformOrder;

  if (existingIndex >= 0) {
    // Update existing player order
    finalOrder = {
      ...currentOrders[existingIndex],
      ...orderData,
      id: currentOrders[existingIndex].id,
      updatedAt: now,
    };
    currentOrders[existingIndex] = finalOrder;
  } else {
    // Create new order
    finalOrder = {
      ...orderData,
      id: 'ord-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      createdAt: now,
      status: 'Pendente',
    };
    currentOrders.unshift(finalOrder);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentOrders));
      localStorage.setItem(PLAYER_ORDER_KEY, finalOrder.id);
    } catch (err) {
      console.error('Failed to save order to localStorage:', err);
    }
  }

  return finalOrder;
}

export function deleteOrder(id: string): boolean {
  const currentOrders = getStoredOrders();
  const updated = currentOrders.filter((o) => o.id !== id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      const myOrderId = localStorage.getItem(PLAYER_ORDER_KEY);
      if (myOrderId === id) {
        localStorage.removeItem(PLAYER_ORDER_KEY);
      }
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
