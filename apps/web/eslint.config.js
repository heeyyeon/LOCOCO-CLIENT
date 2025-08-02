import { nextJsConfig } from '@lococo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Always try to resolve types under `<root>@types` directory even if it doesn't contain any source code, like `@types/unist`

          bun: true, // Resolve Bun modules (https://github.com/import-js/eslint-import-resolver-typescript#bun)

          // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json or <root>/jsconfig.json by default

          // Use <root>/path/to/folder/tsconfig.json or <root>/path/to/folder/jsconfig.json
          project: './tsconfig.json',
        },
      },
      languageOptions: {
        parserOptions: {
          project: 'tsconfig.json',
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  },
];
