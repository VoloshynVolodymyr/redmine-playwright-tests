# Redmine Tests

Playwright tests for Redmine site with Page Object Model (POM) and Allure reporting.

## Setup

1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Run tests: `npm test`
4. Generate Allure report: `npm run report`
5. Open Allure report: `npm run open-report`

## Test Cases

- **TC003**: Check date sorting in Wiki Date Index
- **TC004**: Search for existing word
- **TC005**: Search for non-existing word
- **TC006**: Filter defects in Roadmap
- **TC007**: API test for issues

## Project Structure

- `pages/`: Page Object Model classes
- `tests/`: Test specifications
- `utils/`: Helper utilities
- `config/`: Playwright configuration
- `.github/workflows/`: CI/CD pipeline