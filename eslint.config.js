import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['build/**', 'dist/**', 'node_modules/**', 'coverage/**', 'drizzle/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Only apply TypeScript parsing to source files and TypeScript files in root
    files: ['src/**/*.{js,ts}', 'drizzle.config.ts'],
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    rules: {
      // === TYPESCRIPT RULES === //
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // === SEMICOLON & SPACING RULES === //
      'semi': ['error', 'always'],
      'semi-spacing': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // === LINE & WHITESPACE RULES === //
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-trailing-spaces': 'error',
      // 'eol-last': ['error', 'always'],
      'indent': ['error', 2],

      // === GENERAL BEST PRACTICES === //
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-unused-vars': 'off',
      // 'quotes': ['error', 'single', { avoidEscape: true }],
      // 'quote-props': ['error', 'as-needed'],
      'no-console': 'off',
      'no-debugger': 'warn',

      // === IMPORT RULES === //
      // 'import/no-unresolved': ['error', {
      //   ignore: ['^@/', '^~/', '\\.js$']
      // }],
      'import/extensions': ['error', 'never', { json: 'always' }],
      'import/no-duplicates': 'error',
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        // 'newlines-between': 'always',
      }],
      'import/newline-after-import': 'error',

      // === MODERN JS/TS FEATURES === //
      'prefer-arrow-callback': 'error',
      'no-duplicate-imports': 'error',
      'prefer-spread': 'error',
      'rest-spread-spacing': 'error',
      'template-curly-spacing': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'no-useless-return': 'error',
      'dot-notation': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    // Config files - JavaScript parsing without TypeScript project requirements
    files: ['*.config.js', '**/*.config.js', 'eslint.config.js', 'jest.config.js'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'semi': ['error', 'always'],
      'semi-spacing': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-trailing-spaces': 'error',
      'indent': ['error', 2],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-arrow-callback': 'error',
      'no-duplicate-imports': 'error',
      'prefer-spread': 'error',
      'rest-spread-spacing': 'error',
      'template-curly-spacing': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'no-useless-return': 'error',
      'dot-notation': 'error',
    },
  },
  {
    files: ['*.config.ts', '**/*.config.ts'],
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'semi': ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
      'no-console': 'off',
    },
  },
];