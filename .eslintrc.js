/**
 * ESLint Configuration
 * 
 * Created by Shpetim Haxhiu (https://pito.dev)
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'warn',
  },
}; 