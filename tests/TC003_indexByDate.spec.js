import { test, expect } from '@playwright/test';
import { WikiPage } from '../pages/wikiPage.js';

test('TC003: Check date sorting in Wiki Date Index', async ({ page }) => {
  const wikiPage = new WikiPage(page);
  await wikiPage.goToDateIndex();
  const isSorted = await wikiPage.isDateSortedDescending();
  expect(isSorted).toBe(true);
});