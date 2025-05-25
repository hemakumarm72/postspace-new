module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',

    tsconfigRootDir: __dirname,
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'import'],

  ignorePatterns: [
    '/dist/**/*', //TODO: Ignore built files.
  ],

  rules: {
    'object-curly-spacing': ['error', 'always'],
    'import/no-unresolved': 0,
    'linebreak-style': 0, // <----------
    'max-len': 0,
    'new-cap': 0,
    camelcase: 0,
    'import/named': 0,
    'spaced-comment': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-floating-promises': 0,
    // '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
}
