import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { playwright } from "@vitest/browser-playwright";

const regularTestPaths = ["**/*.{test,spec}.{js,ts}"];
const browserTestPaths = ["**/*.{test,spec}.{jsx,tsx}"];

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          include: [...regularTestPaths],
          name: { label: "node", color: "magenta" },
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          include: [...browserTestPaths],
          name: { label: "browser", color: "blue" },
          browser: {
            screenshotFailures: false,
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
