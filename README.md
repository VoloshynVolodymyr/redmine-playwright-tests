# Redmine.org Test Automation

[![Playwright Tests](https://github.com/YOUR_USERNAME/redmine-tests/actions/workflows/test.yml/badge.svg)](https://github.com/YOUR_USERNAME/redmine-tests/actions/workflows/test.yml)
[![GitHub Pages](https://img.shields.io/badge/Allure-Report-blue)](https://YOUR_USERNAME.github.io/redmine-tests)

## 📋 Test Coverage

| TC ID | Test Case Name                                                     | Priority | Area    |
| ----- | ------------------------------------------------------------------ | -------- | ------- |
| TC01  | Verification of descending order on the "Index by date" wiki page  | Medium   | Wiki    |
| TC02  | Searching the website using a valid keyword ("agenda")             | High     | Search  |
| TC03  | Searching the website using a non-existent keyword ("abracadabra") | Medium   | Search  |
| TC04  | Filtering roadmap by tracker type "Defect" only                    | High     | Roadmap |
| TC05  | [API] Retrieve a list of public issues in JSON format              | Medium   | API     |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test
npx playwright test tests/TC01_indexByDate.spec.js

# Generate Allure report
npm run report:generate
npm run report:open
```
