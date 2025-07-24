import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    name: "app",
    include: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
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
