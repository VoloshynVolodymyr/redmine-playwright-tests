import { BasePage } from './basePage.js'

export class RoadmapPage extends BasePage {
  constructor(page) {
    super(page)
    this.roadmapUrl = '/projects/redmine/roadmap'
    this.checkboxDefect = 'input[name="tracker_ids[]"][value="1"]'
    this.checkboxFeature = 'input[name="tracker_ids[]"][value="2"]'
    this.checkboxPatch = 'input[name="tracker_ids[]"][value="3"]'
    this.applyButton = 'input[value="Apply"]'
    this.issueRows = '.related-issues tr.issue td.subject a'
  }

  async goToRoadmap() {
    await this.navigate(this.roadmapUrl)
  }

  async uncheckFeatureAndPatch() {
    await this.page.uncheck(this.checkboxFeature)
    await this.page.uncheck(this.checkboxPatch)
  }

  async applyFilters() {
    await this.clickAndNavigate(this.applyButton)
  }

  async getVisibleIssueTypes() {
    const texts = await this.page.$$eval(this.issueRows, (elements) =>
      elements.map((el) => el.textContent.trim())
    )

    return texts.map((text) => {
      if (text.includes('Defect')) return 'Defect'
      if (text.includes('Feature')) return 'Feature'
      if (text.includes('Patch')) return 'Patch'
      return 'Other'
    })
  }

  async areAllIssuesOfType(expectedType) {
    const types = await this.getVisibleIssueTypes()
    return types.every((type) => type === expectedType)
  }

  async areFiltersApplied() {
    const isFeatureChecked = await this.page.isChecked(this.checkboxFeature)
    const isPatchChecked = await this.page.isChecked(this.checkboxPatch)
    const isDefectChecked = await this.page.isChecked(this.checkboxDefect)
    return {
      defect: isDefectChecked,
      feature: isFeatureChecked,
      patch: isPatchChecked
    }
  }
}
