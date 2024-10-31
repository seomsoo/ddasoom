// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "alloy",
    "alloy/react",
    "alloy/typescript",
    "plugin:import/recommended",
    "expo",
    "prettier",
  ],
  plugins: ["simple-import-sort", "prettier"],
  rules: {
    "@typescript-eslint/no-empty-interface": "off",
    "react/no-unstable-nested-components": "off",
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-unresolved": 0,
  },
};
