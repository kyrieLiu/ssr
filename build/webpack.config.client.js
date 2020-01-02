const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultplugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    // 页面上显示编译错误
    errors: true
  },
  // 每次启动自动打开一个页面
  // open: true,
  // url路由的映射
  historyApiFallback: {
    index: '/public/index.html'
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  // 每次代码更新进行热更新，不更新不变的代码
  hot: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            // 将样式写入html文件
            'vue-style-loader',
            // 将样式从css文件中取出
            // 'css-loader',
            {
              loader: 'css-loader'
              // options: {
              //   module: true,
              //   localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
              // }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            // 将stylus代码从文件中抽取并转换成css
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultplugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      // 配置单独打包的js内容模块
      vendor: ['vue']
    },
    output: {
      // 这里使用chunkhash的原因是hash是面对所有js文件的，而chunkhash可以只针对单个文件生成hash值
      filename: '[name].[chunkhash:8].js'
    },
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
    plugins: defaultplugins.concat([
      // 实现单独将样式放在一个css文件中
      new ExtractPlugin('styles.[contentHash:8].css'),
      // 实现将类库文件单独进行打包
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // 将webpack相关代码单独打包
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
