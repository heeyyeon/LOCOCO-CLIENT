import storybook from 'eslint-plugin-storybook';

import config from '@lococo/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [
  ...storybook.configs['flat/recommended'],
  ...config,

  {
    files: ['**/*.js', '**/*.ts'],
    ignores: [
      'node_modules',
      'dist',
      'build',
      'public',
      'public/**',
      'public/**/*',
      'icons/**/*',
    ],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
