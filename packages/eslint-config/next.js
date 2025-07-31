import pluginNext from '@next/eslint-plugin-next';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import baseConfig from './base.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nextJsConfig = [
  ...pluginImport.flatConfigs.recommended,
  ...pluginImport.flatConfigs.typescript,
  ...baseConfig,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
    settings: {
      // for alias import
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
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
