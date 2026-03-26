// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = tseslint.config(
  {
    ignores: ['projects/**/*', '.angular/**/*'],
  },
  {
    files: ['*.config.js', '*.config.cjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended.map(c => ({ ...c, files: ['**/*.ts'] })),
  ...angular.configs.tsRecommended.map(c => ({ ...c, files: ['**/*.ts'] })),
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        projectService: true,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'no-alert': 'warn',
      'no-debugger': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'clear'],
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-for-in-array': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variableLike', 'method', 'property'],
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: ['variable', 'property'],
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'prettier/prettier': 'warn',
    },
  },
  ...angular.configs.templateRecommended.map(c => ({
    ...c,
    files: ['**/*.html'],
  })),
  ...angular.configs.templateAccessibility.map(c => ({
    ...c,
    files: ['**/*.html'],
  })),
  {
    files: ['**/*.html'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': ['warn', { parser: 'angular' }],
    },
  },
);
