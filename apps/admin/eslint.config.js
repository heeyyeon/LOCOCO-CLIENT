import { nextJsConfig } from '@lococo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          bun: true,
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
    rules: {
      // 디자인 시스템 워크스페이스 패키지는 TS/Next 레벨에서 정상 해석되므로
      // eslint-plugin-import의 false positive는 무시한다.
      'import/no-unresolved': ['error', { ignore: ['^@lococo/design-system/'] }],
    },
  },
];
