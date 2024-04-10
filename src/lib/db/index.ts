import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema'; // TODO use drizzle config instead.

export const DATABASE_URL = process.env.DATABASE_URL ?? 'sqlite.db';

// Caching db connection in dev.
const globalDb = globalThis as unknown as {
	conn?: Database.Database;
};

const sqlite = globalDb.conn ?? new Database(DATABASE_URL, { fileMustExist: false });

if (process.env.NODE_ENV !== 'production') {
	globalDb.conn = sqlite;
}

const db = drizzle(sqlite, { schema });

export default db;
