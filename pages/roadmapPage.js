import { BasePage } from './basePage.js';

export class RoadmapPage extends BasePage {
  constructor(page) {
    super(page);
    this.roadmapUrl = '/projects/redmine/roadmap';
    this.statusFilter = '#status_id'; // Assuming filter select
    this.applyButton = 'input[type="submit"]';
    this.issuesSelector = '.issue'; // Assuming issue elements
  }

  async goToRoadmap() {
    await this.navigate(this.roadmapUrl);
  }

  async applyStatusFilter(status) {
    await this.page.selectOption(this.statusFilter, status);
    await this.click(this.applyButton);
    await this.waitForLoad();
  }

  async getIssueCount() {
    return await this.page.locator(this.issuesSelector).count();
  }
}