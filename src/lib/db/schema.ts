import { sql } from 'drizzle-orm';
import { sqliteTableCreator, int, text } from 'drizzle-orm/sqlite-core';

export const TABLE_PREFIX = 'lss';

export const createTable = sqliteTableCreator((name) => `${TABLE_PREFIX}_${name}`);

export const users = createTable('users', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	email: text('email', { length: 256 }).unique().notNull(),
	password: text('password', { length: 256 }).notNull(),
	createdAt: int('created_at', { mode: 'timestamp' })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});
