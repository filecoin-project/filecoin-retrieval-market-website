
/**
 * Eslint configuration.
 */

module.exports = {
  env: {
    browser: 1
  },
  extends: [
    '@untile/eslint-config-untile-react',
    'next',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': ['error', {
      'ts-ignore': false
    }],
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-process-env': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'react/react-in-jsx-scope': 0,
    'require-await': 0
  }
};
