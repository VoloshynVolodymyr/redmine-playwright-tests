import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  use: {
    baseURL: "https://www.redmine.org",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry"
  },

  reporter: [
    ["line"],
    ["allure-playwright", {
      outputFolder: "allure-results",
      detail: true
    }]
  ],

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 720 }
      }
    }
  ]
});

