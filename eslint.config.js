const { defineConfig } = require("eslint/config");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const importPlugin = require("eslint-plugin-import");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
  {
    ignores: ["node_modules", "build", "dist", ".next", "next-env.d.ts", ".postgres-data"]
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },

    settings: {
      react: { version: "detect" },
      import: {
        resolver: {
          typescript: {}
        }
      }
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tseslint,
      import: importPlugin,
      prettier: prettierPlugin
    },

    rules: {
      ...prettierConfig.rules,

      "prettier/prettier": ["error"],

      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      "no-console": "warn"
    }
  }
]);
