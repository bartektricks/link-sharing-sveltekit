import { expect, test } from '@playwright/test';

test('page exists', async ({ page }) => {
	await page.goto('/');
	expect(await page.title()).toBe('Home');
	expect(await page.content()).toContain('Hello world');
});
