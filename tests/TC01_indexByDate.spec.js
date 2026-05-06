// tests/TC01_indexByDate.spec.js (детальна версія)

import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage.js'
import { WikiPage } from '../pages/wikiPage.js'

test.describe('Wiki Filtering Date Index Tests', () => {
  let homePage
  let wikiPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    wikiPage = new WikiPage(page)
    await homePage.navigate('/')
    await expect(page).toHaveURL('/')
  })

  test('TC01 - Verification of descending order on the "Index by date" wiki page', async ({
    page
  }) => {
    await test.step('Click "Index by date" link in the sidebar', async () => {
      await homePage.goToIndexByDate()
      await expect(page).toHaveURL(/date_index/)
    })

    await test.step('Verify page title contains "Index by date"', async () => {
      const contentTitle = await wikiPage.getContentHeader()
      expect(contentTitle).toContain('Index by date')
    })

    await test.step('Verify dates are in descending order', async () => {
      const dates = await wikiPage.getDatesList()
      expect(dates.length).toBeGreaterThan(0)

      for (let i = 0; i < dates.length - 1; i++) {
        const currentDate = new Date(dates[i])
        const nextDate = new Date(dates[i + 1])
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime())
      }
    })
  })
})
