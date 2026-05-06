// tests/TC03_searchInvalid.spec.js

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
    await expect(page).toHaveURL('https://www.redmine.org/')
  })

  test('TC03 - Searching the website using a non-existent keyword ("abracadabra")', async ({
    page
  }) => {
    const nonExistentKeyword = 'abracadabra'

    await test.step('Enter non-existent keyword "abracadabra" and press Enter', async () => {
      await homePage.search(nonExistentKeyword)
    })

    await test.step('Verify search results page is loaded', async () => {
      await expect(page).toHaveURL(/search/)
    })

    await test.step('Verify result count is 0', async () => {
      const resultCount = await searchPage.getResultCount()
      console.log(`Found ${resultCount} results for "abracadabra"`)
      expect(resultCount).toBe(0)
    })

    await test.step('Verify no highlighted words are present', async () => {
      const highlightedTexts = await searchPage.getHighlightedTexts()
      expect(highlightedTexts).toHaveLength(0)
    })

    await test.step('Verify search keyword remains in input field', async () => {
      const inputValue = await searchPage.getSearchInputValue()
      expect(inputValue).toBe(nonExistentKeyword)
    })
  })
})
