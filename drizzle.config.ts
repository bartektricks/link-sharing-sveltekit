import type { Config } from 'drizzle-kit';
import { DATABASE_URL } from './src/lib/db';
import { TABLE_PREFIX } from './src/lib/db/schema';

export default {
	schema: './src/lib/db/schema.ts',
	out: './drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: DATABASE_URL,
	},
	tablesFilter: [`${TABLE_PREFIX}_*`],
} satisfies Config;
