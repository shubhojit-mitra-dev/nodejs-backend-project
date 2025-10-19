import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['build/**', 'dist/**', 'node_modules/**', 'coverage/**', 'drizzle/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}', 'jest.config.js'],
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    rules: {
      // Extend recommended configs
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,

      // === TYPESCRIPT RULES === //
      '@typescript-eslint/no-explicit-any': 'warn', // Warn instead of error
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error', // Your favorite - import type
        { 
          prefer: 'type-imports', 
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // === SEMICOLON & SPACING RULES (Your Favorites) === //
      'semi': ['error', 'always'], // Missing semicolon fix
      'semi-spacing': 'error', // Space after semicolon
      'comma-spacing': ['error', { before: false, after: true }], // Space after comma
      'arrow-spacing': ['error', { before: true, after: true }], // Arrow spacing
      'space-before-blocks': 'error', // Space before blocks
      'keyword-spacing': 'error', // Space around keywords
      'space-infix-ops': 'error', // Space around operators
      'object-curly-spacing': ['error', 'always'], // Space in objects { key: value }
      'array-bracket-spacing': ['error', 'never'], // No space in arrays [1, 2, 3]

      // === LINE & WHITESPACE RULES === //
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }], // Your favorite
      'no-trailing-spaces': 'error', // Your favorite - remove trailing spaces
      // 'eol-last': ['error', 'always'], // Newline at end of file
      'indent': ['error', 2], // 2-space indentation

      // === GENERAL BEST PRACTICES === //
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-unused-vars': 'off', // Handled by TypeScript version

      // === QUOTES & STRINGS === //
      // 'quotes': ['error', 'single', { avoidEscape: true }],
      'quote-props': ['error', 'as-needed'],

      // === DEVELOPER FRIENDLY === //
      'no-console': 'off', // Allow console for development
      'no-debugger': 'warn', // Warn about debugger, don't error

      // === IMPORT RULES === //
      'import/no-unresolved': ['error', { 
        ignore: ['^@/', '^~/', '\\.js$'] 
      }],
      'import/extensions': ['error', 'never', { json: 'always' }],
      'import/no-duplicates': 'error',
      'import/order': ['error', {
        groups: [
          'builtin',   // Node.js built-ins
          'external',  // npm packages
          'internal',  // Internal modules
          'parent',    // ../
          'sibling',   // ./
          'index',     // ./index
        ],
        // 'newlines-between': 'always',
        // alphabetize: { order: 'asc', caseInsensitive: true },
      }],
      'import/newline-after-import': 'error',

      // === MODERN JS/TS FEATURES === //
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': ['error', {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: false, object: false },
      }],
      'no-duplicate-imports': 'error',
      'prefer-spread': 'error',
      'rest-spread-spacing': 'error',
      'template-curly-spacing': 'error',

      // === PREVENT COMMON MISTAKES === //
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
          project: ['./tsconfig.json'],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  {
    // Config files can have default exports
    files: ['*.config.{js,ts}', '**/*.config.{js,ts}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    // Test files are more relaxed
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', '**/__tests__/**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'max-lines-per-function': 'off',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];