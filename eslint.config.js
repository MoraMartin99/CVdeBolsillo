import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
  },
  globalIgnores(["dist/", "doc/", "notes/"]),
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: js.configs.recommended.rules,
  },
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  eslintPluginPrettierRecommended,
]);
