import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage.js';

test('TC005: Search for non-existing word', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.goToSearch();
  await searchPage.performSearch('nonexistingword12345');
  expect(await searchPage.hasNoResults()).toBe(true);
});