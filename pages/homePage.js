import { BasePage } from './basePage.js'

export class HomePage extends BasePage {
  constructor(page) {
    super(page)
    this.searchInput = '#q'
    this.indexByDateLink = 'a[href="/projects/redmine/wiki/date_index"]'
    this.registerLink = 'a.register'
    this.roadmapLink = 'a.roadmap'
  }

  async search(keyword) {
    await this.fill(this.searchInput, keyword)
    await this.page.keyboard.press('Enter')
    await this.waitForLoad()
  }

  async goToIndexByDate() {
    await this.clickAndNavigate(this.indexByDateLink)
  }

  async goToRoadmap() {
    await this.clickAndNavigate(this.roadmapLink)
  }
}
