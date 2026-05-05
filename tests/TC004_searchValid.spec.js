import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage.js';

test('TC004: Search for existing word', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.goToSearch();
  await searchPage.performSearch('redmine');
  expect(await searchPage.hasResults()).toBe(true);
});