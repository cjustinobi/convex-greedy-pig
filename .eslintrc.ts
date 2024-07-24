import { Linter } from "eslint";

const config: Linter.Config = {
  plugins: [
    "no-warnings"
  ],
  rules: {
    "no-warnings/warn-to-error": "error"
  }
};

export default config;
