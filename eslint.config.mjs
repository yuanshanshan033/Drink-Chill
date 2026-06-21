import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: projectRoot
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", ".data/**", "next-env.d.ts"]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-img-element": "off"
    }
  }
];

export default eslintConfig;
