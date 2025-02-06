import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    rules: {
      'capitalized-comments': ['error', 'always'],
    },
  },
  {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
      },
      {
        usePrettierrc: true,
      },
      {
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
  },
  eslintPluginPrettierRecommended,
];
