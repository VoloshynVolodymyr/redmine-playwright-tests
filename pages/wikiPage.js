import { BasePage } from './basePage.js'

export class WikiPage extends BasePage {
  constructor(page) {
    super(page)
    this.dateIndexUrl = '/projects/redmine/wiki/date_index'
    this.dateHeaders = '#content h3'
    this.contentHeader = '#content h2'
  }

  async goToDateIndex() {
    await this.navigate(this.dateIndexUrl)
  }

  async getDatesList() {
    return await this.page.$$eval(this.dateHeaders, (elements) =>
      elements.map((el) => el.textContent.trim())
    )
  }

  async getContentHeader() {
    return await this.page.textContent(this.contentHeader)
  }

  static verifyDescendingOrder(dates) {
    for (let i = 0; i < dates.length - 1; i++) {
      if (dates[i] < dates[i + 1]) return false
    }
    return true
  }
}
