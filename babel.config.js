module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@data': './src/data',
          '@domain': './src/domain',
          '@infra': './src/infra',
          '@presentation': './src/presentation'
        }
      }
    ]
  ],
  ignore: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.js', '**/*.spec.js']
}
