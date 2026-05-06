export class BasePage {
  constructor(page) {
    this.page = page
    this.baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'https://www.redmine.org'
  }

  async navigate(path = '') {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`
    await this.page.goto(url)
    await this.page.waitForLoadState('networkidle')
  }

  async waitForLoad() {
    await this.page.waitForLoadState()
  }

  async getTitle() {
    return await this.page.title()
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` })
  }

  async click(selector) {
    await this.page.click(selector)
  }

  async clickAndNavigate(selector) {
    await this.page.click(selector)
    await this.page.waitForLoadState('networkidle')
  }

  async fill(selector, text) {
    await this.page.fill(selector, text)
  }

  async getText(selector) {
    return await this.page.textContent(selector)
  }
}
