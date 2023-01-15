module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
