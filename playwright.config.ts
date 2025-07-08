import { defineConfig, devices } from "@playwright/test";

import { env } from "@/env";

const baseURL = env.SERVER_URL || "http://localhost:3000";

// Only start the web server in non-CI environments
const webServer = env.CI
  ? undefined
  : {
      command: "pnpm dev",
      port: 3000,
      timeout: 120 * 1000,
      reuseExistingServer: true,
    };

export default defineConfig({
  testDir: "./e2e",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!env.CI,
  retries: env.CI ? 2 : 0,
  workers: env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
    headless: true,
  },
  webServer,

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});
