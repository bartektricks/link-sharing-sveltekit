import { sql } from 'drizzle-orm';
import { sqliteTableCreator, int, text } from 'drizzle-orm/sqlite-core';

export const TABLE_PREFIX = 'lss';

export const createTable = sqliteTableCreator((name) => `${TABLE_PREFIX}_${name}`);

export const posts = createTable('posts', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name', { length: 256 }),
	createdAt: int('created_at', { mode: 'timestamp' })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});
