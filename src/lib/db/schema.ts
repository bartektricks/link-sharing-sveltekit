import { sql } from 'drizzle-orm';
import { sqliteTableCreator, int, text, integer } from 'drizzle-orm/sqlite-core';

export const TABLE_PREFIX = 'lss';

export const createTable = sqliteTableCreator((name) => `${TABLE_PREFIX}_${name}`);

export const user = createTable('user', {
	id: text('id').unique().primaryKey(),
	email: text('email', { length: 256 }).unique().notNull(),
	password: text('password', { length: 256 }).notNull(),
	createdAt: int('created_at', { mode: 'timestamp' })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});

export const session = createTable('session', {
	id: text('id').notNull().unique().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at').notNull(),
});
