import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/data';
import { UniformOrder } from '@/lib/types';

// In-memory fallback array for server environment
let serverOrders: UniformOrder[] = [...INITIAL_ORDERS];

export async function GET() {
  return NextResponse.json({ orders: serverOrders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamId, playerName, jerseyName, number, size, position, phone } = body;

    if (!teamId || !playerName || !jerseyName || !number || !size) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes: time, nome, número e tamanho são necessários.' },
        { status: 400 }
      );
    }

    const newOrder: UniformOrder = {
      id: 'ord-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      teamId,
      playerName,
      jerseyName: jerseyName.toUpperCase(),
      number: Number(number),
      size,
      position: position || 'Atacante',
      phone: phone || '',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pendente',
    };

    serverOrders = [newOrder, ...serverOrders];

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Error creating uniform order:', error);
    return NextResponse.json({ error: 'Falha interna ao registrar pedido.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID do pedido não informado.' }, { status: 400 });
    }

    serverOrders = serverOrders.filter((o) => o.id !== id);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar pedido.' }, { status: 500 });
  }
}
