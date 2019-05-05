const pkg = require('./package.json')
const px2viewport = require('postcss-px-to-viewport')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  crossorigin: 'anonymous',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2viewport({
            viewportWidth: 375,
          }),
        ],
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? `https://cdn.ruguoapp.com/${pkg.name}`
      : '/',
}
