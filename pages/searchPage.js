import { BasePage } from './basePage.js';

export class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchUrl = '/search';
    this.searchInput = '#q'; // Assuming search input id
    this.searchButton = 'input[type="submit"]';
    this.resultsSelector = '.search-results'; // Assuming results container
    this.noResultsSelector = '.no-results'; // Assuming no results message
  }

  async goToSearch() {
    await this.navigate(this.searchUrl);
  }

  async performSearch(query) {
    await this.type(this.searchInput, query);
    await this.click(this.searchButton);
    await this.waitForLoad();
  }

  async hasResults() {
    return await this.page.isVisible(this.resultsSelector);
  }

  async hasNoResults() {
    return await this.page.isVisible(this.noResultsSelector);
  }
}