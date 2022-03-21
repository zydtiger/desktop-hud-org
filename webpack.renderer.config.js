const rules = require('./webpack.rules');
const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('path')

rules.push({
  test: /\.vue$/,
  use: 'vue-loader'
})

module.exports = {
  // Put your normal webpack config below here
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules,
  }, 
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      '@': resolve('./src/')
    }
  },
};
