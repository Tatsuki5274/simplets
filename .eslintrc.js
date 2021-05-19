module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/display-name": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-console": "warn",
    "react/jsx-key": "warn", // 一時的な措置。errorに戻す
    "@typescript-eslint/no-non-null-assertion": "warn", // 一時的な措置。修正後、errorに変更
  },
};
