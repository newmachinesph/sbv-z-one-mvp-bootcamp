import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/e2e",
  testMatch: "**/*.e2e.ts",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["html", { outputFolder: "playwright-report" }], ["line"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Start the dev server only when not already running (local dev workflow)
  webServer: process.env.CI
    ? {
        command: "npm run build && npm run start",
        url: "http://localhost:3000",
        timeout: 120_000,
        reuseExistingServer: false,
      }
    : {
        command: "npm run dev",
        url: "http://localhost:3000",
        timeout: 60_000,
        reuseExistingServer: true,
      },
});
