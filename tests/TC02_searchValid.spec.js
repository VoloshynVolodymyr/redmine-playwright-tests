// tests/TC02_searchValid.spec.js

import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage.js'
import { SearchPage } from '../pages/searchPage.js'

test.describe('Search Functionality Tests', () => {
  let homePage
  let searchPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    searchPage = new SearchPage(page)
    await homePage.navigate('/')
    await expect(page).toHaveURL('/')
  })

  test('TC02 - Searching the website using a valid keyword ("agenda")', async ({ page }) => {
    const validKeyword = 'agenda'

    await test.step('Enter search keyword "agenda" and press Enter', async () => {
      await homePage.search(validKeyword)
    })

    await test.step('Verify search results page is loaded', async () => {
      await expect(page).toHaveURL(/search/)
    })

    await test.step('Verify result count is greater than 0', async () => {
      const resultCount = await searchPage.getResultCount()
      console.log(`Found ${resultCount} results for "${validKeyword}"`)
      expect(resultCount).toBeGreaterThan(0)
    })

    await test.step('Verify highlighted word "agenda" appears in results', async () => {
      const highlightedTexts = await searchPage.getHighlightedTexts()
      expect(highlightedTexts.length).toBeGreaterThan(0)

      highlightedTexts.forEach((text) => {
        expect(text.toLowerCase()).toContain(validKeyword)
      })
    })

    await test.step('Verify search keyword remains in input field', async () => {
      const inputValue = await searchPage.getSearchInputValue()
      expect(inputValue).toBe(validKeyword)
    })
  })
})
