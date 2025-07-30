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
      '@typescript-eslint/naming-convention': [
        'error',

        // const boolean 변수: is|can|has 접두사 필수
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['boolean'],
          format: ['camelCase'],
          custom: {
            regex: '^(is|can|has)[A-Z][a-zA-Z0-9]*$',
            match: true,
          },
        },

        // const 변수 (boolean 제외): camelCase or UPPER_CASE
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['boolean'],
          format: ['camelCase', 'UPPER_CASE'],
          custom: {
            regex: '^is[A-Z][a-zA-Z0-9]*$',
            match: false,
          },
        },

        // 타입/인터페이스: 파스칼케이스
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
    },
  },
];
