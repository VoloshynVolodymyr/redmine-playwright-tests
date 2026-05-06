import js from '@eslint/js'
import globals from 'globals'
import playwright from 'eslint-plugin-playwright'

export default [
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    rules: {
      // базові
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',

      // стиль
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2]
    }
  },

  // 🔥 Playwright тести
  {
    files: ['tests/**/*.js'],
    plugins: {
      playwright
    },
    rules: {
      ...playwright.configs.recommended.rules,

      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/expect-expect': 'warn'
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  }
]
