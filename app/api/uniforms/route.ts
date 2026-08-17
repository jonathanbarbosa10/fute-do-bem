import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/data';
import { UniformOrder } from '@/lib/types';

// Persistent Cloud Key for Fute do Bem Tournament
const CLOUD_BIN_URL = 'https://api.jsonbin.io/v3/b/66c0d8b5e41b4d34e423528b';
const CLOUD_MASTER_KEY = '$2a$10$Wp8HlPzE.pW3eUv4E1w4..eOq3Q7kF2XzH3K5g9Y8j1L2m3N4o5P6'; // Master Key for cloud persistence

// In-memory cache fallback for high speed
let localCache: UniformOrder[] = [...INITIAL_ORDERS];

// Helper to fetch orders from Cloud Database
async function fetchCloudOrders(): Promise<UniformOrder[]> {
  try {
    const res = await fetch('https://api.npoint.io/46f39fa2e4cb2f5e3e21', {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localCache = data;
        return data;
      }
    }
  } catch (err) {
    console.warn('Cloud fetch warning, using local cache:', err);
  }
  return localCache;
}

// Helper to save orders to Cloud Database
async function saveCloudOrders(orders: UniformOrder[]): Promise<boolean> {
  localCache = orders;
  try {
    const res = await fetch('https://api.npoint.io/46f39fa2e4cb2f5e3e21', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orders),
    });
    return res.ok;
  } catch (err) {
    console.error('Cloud save error:', err);
    return false;
  }
}

export async function GET() {
  try {
    const orders = await fetchCloudOrders();
    return NextResponse.json({ orders }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json({ orders: localCache });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, teamId, playerName, jerseyName, number, size, position, phone } = body;

    if (!teamId || !playerName || !jerseyName || !number || !size) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes: time, nome, número e tamanho são necessários.' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString().split('T')[0];
    const currentOrders = await fetchCloudOrders();

    // Check if updating existing order by id or playerName
    const existingIndex = currentOrders.findIndex(
      (o) => (id && o.id === id) || (o.playerName.toLowerCase() === playerName.toLowerCase() && o.teamId === teamId)
    );

    let finalOrder: UniformOrder;

    if (existingIndex >= 0) {
      finalOrder = {
        ...currentOrders[existingIndex],
        teamId,
        playerName,
        jerseyName: jerseyName.toUpperCase(),
        number: Number(number),
        size,
        position: position || currentOrders[existingIndex].position,
        phone: phone || '',
        updatedAt: now,
      };
      currentOrders[existingIndex] = finalOrder;
    } else {
      finalOrder = {
        id: id || 'ord-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
        teamId,
        playerName,
        jerseyName: jerseyName.toUpperCase(),
        number: Number(number),
        size,
        position: position || 'Atacante',
        phone: phone || '',
        createdAt: now,
        status: 'Pendente',
      };
      currentOrders.unshift(finalOrder);
    }

    // Save to global cloud DB
    await saveCloudOrders(currentOrders);

    return NextResponse.json({ success: true, order: finalOrder, orders: currentOrders }, { status: 201 });
  } catch (error) {
    console.error('Error saving uniform order:', error);
    return NextResponse.json({ error: 'Falha interna ao registrar pedido no banco de dados.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID do pedido não informado.' }, { status: 400 });
    }

    let currentOrders = await fetchCloudOrders();
    currentOrders = currentOrders.filter((o) => o.id !== id);
    await saveCloudOrders(currentOrders);

    return NextResponse.json({ success: true, id, orders: currentOrders });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar pedido no banco de dados.' }, { status: 500 });
  }
}
