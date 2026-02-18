import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === 'production') {
    console.warn("⚠️ DATABASE_URL não encontrada. O banco de dados não será inicializado corretamente durante este processo.");
}

const sql = neon(databaseUrl || "");
export const db = drizzle(sql, { schema });
