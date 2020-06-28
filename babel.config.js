module.exports = {
  presets: ['@vue/app'],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    // element官方教程
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
