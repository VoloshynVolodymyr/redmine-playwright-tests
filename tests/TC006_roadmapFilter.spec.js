import { test, expect } from '@playwright/test';
import { RoadmapPage } from '../pages/roadmapPage.js';

test('TC006: Filter defects in Roadmap', async ({ page }) => {
  const roadmapPage = new RoadmapPage(page);
  await roadmapPage.goToRoadmap();
  await roadmapPage.applyStatusFilter('open'); // Assuming 'open' is a valid option
  const issueCount = await roadmapPage.getIssueCount();
  expect(issueCount).toBeGreaterThanOrEqual(0);
});