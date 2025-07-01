import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
  typescript: {
    check: true, // 타입 체크 활성화
    reactDocgen: 'react-docgen-typescript', // props 자동 추출 도구
  },
  viteFinal: (config) => {
    config.resolve = config.resolve || {};
    if (!Array.isArray(config.resolve.alias)) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@': resolve(__dirname, '../src'),
      };
    }
    return config;
  },
};
export default config;
