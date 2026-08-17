import { NextResponse } from 'next/server';
import { UniformOrder } from '@/lib/types';
import { dbGetAllOrders, dbUpsertOrder, dbDeleteOrder } from '@/lib/db';

export async function GET() {
  try {
    const orders = await dbGetAllOrders();
    return NextResponse.json({ orders }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching orders from Neon:', error);
    return NextResponse.json({ orders: [] });
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

    const num = Number(number);
    const now = new Date().toISOString().split('T')[0];

    const currentOrders = await dbGetAllOrders();

    // Check if updating existing order by id or playerName
    const existingOrder = currentOrders.find(
      (o) => (id && o.id === id) || (o.playerName.toLowerCase() === playerName.toLowerCase() && o.teamId === teamId)
    );

    // UNIQUE NUMBER TRAVA PER TEAM CHECK
    const duplicateNumberOrder = currentOrders.find(
      (o) =>
        o.teamId === teamId &&
        o.number === num &&
        o.id !== (existingOrder ? existingOrder.id : id) &&
        o.playerName.toLowerCase() !== playerName.toLowerCase()
    );

    if (duplicateNumberOrder) {
      return NextResponse.json(
        {
          error: `O número #${num} já foi escolhido por ${duplicateNumberOrder.playerName} na Seleção ${teamId.toUpperCase()}. Escolha outro número.`,
        },
        { status: 400 }
      );
    }

    const orderToSave: UniformOrder = {
      id: existingOrder ? existingOrder.id : (id || 'ord-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5)),
      teamId,
      playerName,
      jerseyName: jerseyName.toUpperCase(),
      number: num,
      size,
      position: position || (existingOrder ? existingOrder.position : 'Atacante'),
      phone: phone || '',
      createdAt: existingOrder ? existingOrder.createdAt : now,
      updatedAt: now,
      status: existingOrder ? existingOrder.status : 'Pendente',
    };

    // Save/Upsert directly to Neon PostgreSQL database
    await dbUpsertOrder(orderToSave);

    const updatedOrders = await dbGetAllOrders();

    return NextResponse.json({ success: true, order: orderToSave, orders: updatedOrders }, { status: 201 });
  } catch (error) {
    console.error('Error saving uniform order to Neon DB:', error);
    return NextResponse.json({ error: 'Falha interna ao registrar pedido no Neon DB.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID do pedido não informado.' }, { status: 400 });
    }

    await dbDeleteOrder(id);
    const updatedOrders = await dbGetAllOrders();

    return NextResponse.json({ success: true, id, orders: updatedOrders });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar pedido no Neon DB.' }, { status: 500 });
  }
}
