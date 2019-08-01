const webpack = require('webpack');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  },
  // Only used for the dev server
  devServer: {
    // This proxies all the calls to flask that start with a /api (makes it look like we only have 1 origin)
    proxy: {
      '^/es': {
        target: 'http://localhost:9200',
        ws: true,
        changeOrigin: true,
        followRedirects: true,
        pathRewrite: {
          '^/es': '/' // rewrite path
        },
      }
    }
  }
};