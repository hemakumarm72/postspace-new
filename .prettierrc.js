module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  semi: false,
  singleQuote: true,
  //NOTE: import order configuration
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '^express(.*)$',
    '^@/components/(.*)$',
    '^@/models/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
}
