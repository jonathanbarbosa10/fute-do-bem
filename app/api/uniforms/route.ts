import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/data';
import { UniformOrder } from '@/lib/types';

// Central server in-memory database for Vercel deployment
let serverOrders: UniformOrder[] = [...INITIAL_ORDERS];

export async function GET() {
  return NextResponse.json({ orders: serverOrders });
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

    // Check if updating existing order by id or playerName
    const existingIndex = serverOrders.findIndex(
      (o) => (id && o.id === id) || (o.playerName.toLowerCase() === playerName.toLowerCase() && o.teamId === teamId)
    );

    let finalOrder: UniformOrder;

    if (existingIndex >= 0) {
      finalOrder = {
        ...serverOrders[existingIndex],
        teamId,
        playerName,
        jerseyName: jerseyName.toUpperCase(),
        number: Number(number),
        size,
        position: position || serverOrders[existingIndex].position,
        phone: phone || '',
        updatedAt: now,
      };
      serverOrders[existingIndex] = finalOrder;
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
      serverOrders.unshift(finalOrder);
    }

    return NextResponse.json({ success: true, order: finalOrder }, { status: 201 });
  } catch (error) {
    console.error('Error saving uniform order:', error);
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
