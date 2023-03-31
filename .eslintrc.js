const prettierOptions = require('./.prettierrc.js')

const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2
}

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    // plugins
    'prettier/prettier': [RULES.WARNING, prettierOptions],
    'simple-import-sort/imports': RULES.ERROR,
    'simple-import-sort/exports': RULES.ERROR,
    // defaults
    'no-undef': RULES.OFF,
    // typescript
    '@typescript-eslint/no-var-requires': RULES.OFF
  }
}
