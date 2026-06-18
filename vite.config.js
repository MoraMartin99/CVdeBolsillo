import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { playwright } from "@vitest/browser-playwright";
import createVirtualModulePlugin from "./plugins/createVirtualModulePlugin";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

const regularTestPaths = ["**/*.{test,spec}.{js,ts}"];
const browserTestPaths = ["**/*.{test,spec}.{jsx,tsx}"];

const TemplateFormPlugin = createVirtualModulePlugin({
  moduleId: "TemplateForm",
});
const PreviewPlugin = createVirtualModulePlugin({ moduleId: "Preview" });

export default defineConfig({
  plugins: [
    TemplateFormPlugin,
    PreviewPlugin,
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    svgr(),
    basicSsl(),
  ],
  test: {
    includeTaskLocation: true,
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
