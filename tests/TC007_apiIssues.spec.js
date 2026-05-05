import { test, expect } from '@playwright/test';

test('TC007: API test for issues', async ({ request }) => {
  const response = await request.get('https://www.redmine.org/issues.json');
  expect(response.ok()).toBe(true);
  const data = await response.json();
  expect(data).toHaveProperty('issues');
  expect(Array.isArray(data.issues)).toBe(true);
});