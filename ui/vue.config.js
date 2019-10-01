var fs = require('fs')

module.exports = {
  configureWebpack: {
    resolve: {

    }
  },
  // devServer Options don't belong into `configureWebpack`
  devServer: {
    host: '127.0.0.1',
    // https: true,
    hot: true,
    disableHostCheck: true,
    headers: {
        'X-Frame-Options': 'allow'
    },
  },

  publicPath: './',

  pwa: {
    themeColor: '#ffffff',
  }
};
