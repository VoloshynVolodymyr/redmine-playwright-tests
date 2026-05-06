// tests/TC04_roadmapFilter.spec.js

import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage.js'
import { RoadmapPage } from '../pages/roadmapPage.js'

test.describe('Roadmap Filter Tests', () => {
  let homePage
  let roadmapPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    roadmapPage = new RoadmapPage(page)
    await homePage.navigate('/')
    await expect(page).toHaveURL('https://www.redmine.org/')
  })

  test('TC04 - Filtering roadmap by tracker type "Defect" only', async ({ page }) => {
    await test.step('Navigate to Roadmap page', async () => {
      await homePage.goToRoadmap()
      await expect(page).toHaveURL(/roadmap/)
    })

    await test.step('Uncheck Feature and Patch filters', async () => {
      await roadmapPage.uncheckFeatureAndPatch()
    })

    await test.step('Apply filters', async () => {
      await roadmapPage.applyFilters()
    })

    await test.step('Verify only Defect issues are displayed', async () => {
      const allAreDefects = await roadmapPage.areAllIssuesOfType('Defect')
      expect(allAreDefects).toBe(true)
    })

    await test.step('Verify filter checkboxes state', async () => {
      const filters = await roadmapPage.areFiltersApplied()
      console.log('Filter state:', filters)

      expect(filters.defect).toBe(true)
      expect(filters.feature).toBe(false)
      expect(filters.patch).toBe(false)
    })
  })
})
