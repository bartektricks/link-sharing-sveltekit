import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: true,
		include: ['src/**/*.{test,spec}.ts'],
		coverage: {
			include: ['**/*.{ts,svelte}', '!**/+*.{ts,svelte}', '!playwright.config.ts'],
		},
	},
});
