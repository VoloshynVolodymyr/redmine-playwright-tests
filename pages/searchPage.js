import { BasePage } from './basePage.js'

export class SearchPage extends BasePage {
  constructor(page) {
    super(page)
    this.resultsContainer = '#search-results'
    this.resultItems = 'span.description'
    this.resultCountHeading = 'h3:has(~ #search-results)'
    this.highlightedWord = '.highlight'
    this.searchInput = '#q'
  }

  async getSearchInputValue() {
    return await this.page.inputValue(this.searchInput)
  }
  async getResultCount() {
    const text = await this.page.textContent(this.resultCountHeading)
    const match = text.match(/\((\d+)\)/)
    return match ? parseInt(match[1]) : 0
  }

  async getHighlightedTexts() {
    return await this.page.$$eval(this.highlightedWord, (elements) =>
      elements.map((el) => el.textContent)
    )
  }
}
