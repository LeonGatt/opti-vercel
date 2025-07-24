import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [".storybook/vitest.setup.ts"],
    name: "storybook",
    include: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    browser: {
      enabled: true,
      headless: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        "./src/app/(payload)/**",
        "*.cjs",
        ".next/**",
        "./src/collections/**",
      ],
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(dirname, "src"),
    },
  },
});
