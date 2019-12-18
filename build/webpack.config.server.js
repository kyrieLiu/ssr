const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// webpack.config.base
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
// vue 服务端渲染插件，让vue实现服务端渲染更容易
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config
config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    // 兼容nodejs需要使用的module.exports的模块引用形式
    libraryTarget: 'commonjs2',
    // 设置输出打包后的文件名字，因为是使用模块加载的js，没必要使用浏览器缓存，所以这里不需要使用hash
    filename: 'server-entry.js',
    // 设置输出的路径
    path: path.join(__dirname, '../server-build')
  },
  // 通过引用的形式调用dependencies里的代码，不需要打包到同一个JavaScript文件中
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      // vue 的服务端渲染推荐添加，可能会有用到
      'process.env.VUE_ENV': '"server"'
    }),
    // 使得输出不是javaScrip而是json
    new VueServerPlugin()
  ]
})

module.exports = config
