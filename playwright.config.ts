import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Only start the web server in non-CI environments
const webServer = process.env.CI
  ? undefined
  : {
      command: 'pnpm dev',
      port: 3000,
      timeout: 120 * 1000,
      reuseExistingServer: true,
    }

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    headless: true,
  },
  webServer,

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
})
