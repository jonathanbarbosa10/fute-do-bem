import { neon } from '@neondatabase/serverless';
import { UniformOrder } from './types';

// Neon Database Connection URL (from environment or default fallback)
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_u3H2wOaEld8R@ep-hidden-sea-a5s07x3v.us-east-2.aws.neon.tech/neondb?sslmode=require';

const sql = neon(databaseUrl);

// Ensure the table exists in Neon PostgreSQL
export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS uniform_orders (
        id TEXT PRIMARY KEY,
        team_id TEXT NOT NULL,
        player_name TEXT NOT NULL,
        jersey_name TEXT NOT NULL,
        number INTEGER NOT NULL,
        size TEXT NOT NULL,
        position TEXT NOT NULL,
        phone TEXT,
        status TEXT NOT NULL DEFAULT 'Pendente',
        created_at TEXT NOT NULL,
        updated_at TEXT
      );
    `;
  } catch (err) {
    console.error('Neon DB init error:', err);
  }
}

// Fetch all orders from Neon PostgreSQL
export async function dbGetAllOrders(): Promise<UniformOrder[]> {
  try {
    await initDb();
    const rows = await sql`
      SELECT id, team_id, player_name, jersey_name, number, size, position, phone, status, created_at, updated_at
      FROM uniform_orders
      ORDER BY created_at DESC;
    `;

    return rows.map((r: any) => ({
      id: r.id,
      teamId: r.team_id,
      playerName: r.player_name,
      jerseyName: r.jersey_name,
      number: Number(r.number),
      size: r.size,
      position: r.position,
      phone: r.phone || '',
      status: r.status || 'Pendente',
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  } catch (err) {
    console.error('Failed to fetch from Neon DB:', err);
    return [];
  }
}

// Save or Update order in Neon PostgreSQL
export async function dbUpsertOrder(order: UniformOrder): Promise<UniformOrder> {
  try {
    await initDb();
    const now = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO uniform_orders (id, team_id, player_name, jersey_name, number, size, position, phone, status, created_at, updated_at)
      VALUES (${order.id}, ${order.teamId}, ${order.playerName}, ${order.jerseyName}, ${order.number}, ${order.size}, ${order.position}, ${order.phone || ''}, ${order.status || 'Pendente'}, ${order.createdAt || now}, ${now})
      ON CONFLICT (id) DO UPDATE SET
        team_id = EXCLUDED.team_id,
        player_name = EXCLUDED.player_name,
        jersey_name = EXCLUDED.jersey_name,
        number = EXCLUDED.number,
        size = EXCLUDED.size,
        position = EXCLUDED.position,
        phone = EXCLUDED.phone,
        status = EXCLUDED.status,
        updated_at = EXCLUDED.updated_at;
    `;

    return order;
  } catch (err) {
    console.error('Failed to upsert to Neon DB:', err);
    return order;
  }
}

// Delete order from Neon PostgreSQL
export async function dbDeleteOrder(id: string): Promise<boolean> {
  try {
    await initDb();
    await sql`
      DELETE FROM uniform_orders WHERE id = ${id};
    `;
    return true;
  } catch (err) {
    console.error('Failed to delete from Neon DB:', err);
    return false;
  }
}
