import storybook from 'eslint-plugin-storybook';
import { config } from '@lococo/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [...storybook.configs['flat/recommended'], config];
