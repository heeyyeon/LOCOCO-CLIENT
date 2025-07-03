import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
  // parserOptions.project 예외 glob을 맨 앞에 위치
  {
    files: [
      '.storybook/*.ts',
      'vitest.config.ts',
      'turbo/generators/config.ts',
      'vitest.shims.d.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: undefined,
      },
    },
  },
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
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: [
      'dist/**',
      '**/node_modules/**',
      'vitest.config.ts',
      'vitest.shims.d.ts',
      '**/*.config.js',
      '.storybook/**',
      'turbo/**',
      'src/icons/svgr.*.js',
    ],
  },
  // 로코코 내부 컨벤션
  {
    rules: {
      // any 사용 제한
      '@typescript-eslint/no-explicit-any': 'error',

      // 네이밍 컨벤션
      '@typescript-eslint/naming-convention': [
        'error',
        // 변수명: 카멜케이스
        {
          selector: 'variable',
          format: ['camelCase'],
          filter: {
            regex: '^[A-Z][A-Z0-9_]*$',
            match: false,
          },
        },
        // boolean 변수: is 접두사
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['camelCase'],
          prefix: ['is'],
        },
        // 상수: 대문자 스네이크케이스
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
        // 타입/인터페이스: 파스칼케이스
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/svgr.*.js', 'src/icons/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.stories.*'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'import/no-anonymous-default-export': 'off',
      'storybook/no-renderer-packages': 'off',
    },
  },
];
