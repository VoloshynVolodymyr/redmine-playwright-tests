import { BasePage } from './basePage.js';

export class WikiPage extends BasePage {
  constructor(page) {
    super(page);
    this.dateIndexUrl = '/projects/redmine/wiki/DateIndex';
    this.dateElements = '.wiki-page-list li'; // Assuming selector for date list items
  }

  async goToDateIndex() {
    await this.navigate(this.dateIndexUrl);
  }

  async getDates() {
    return await this.page.$$eval(this.dateElements, elements => 
      elements.map(el => el.textContent.trim())
    );
  }

  async isDateSortedDescending() {
    const dates = await this.getDates();
    // Simple check: assume dates are in YYYY-MM-DD format or similar
    const parsedDates = dates.map(date => new Date(date)).filter(d => !isNaN(d));
    for (let i = 1; i < parsedDates.length; i++) {
      if (parsedDates[i] > parsedDates[i - 1]) return false;
    }
    return true;
  }
}