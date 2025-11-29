/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "none",
  arrowParens: "avoid",
  semi: true,
  bracketSpacing: true,
  singleQuote: false,

  // Plugins
  plugins: ["prettier-plugin-tailwindcss"]
};
