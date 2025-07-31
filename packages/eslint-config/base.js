import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
  // parserOptions.project 예외 glob을 맨 앞에 위치

  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    ignores: ['dist/**', '**/node_modules/**'],
  },
  // 로코코 내부 컨벤션
  {
    rules: {
      // any 사용 제한
      '@typescript-eslint/no-explicit-any': 'error',

      // 사용되지 않는 변수 경고
      '@typescript-eslint/no-unused-vars': 'error',

      // 중복 import 감지
      'no-duplicate-imports': 'error',
      // 네이밍 컨벤션
    },
  },
];
