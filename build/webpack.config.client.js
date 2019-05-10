const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = require('./webpack.config.base.js')

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"develpoment"' : '"production"'
    }
  }),
  new HTMLPlugin()
]

const devServer = {
  port: '8080',
  host: '0.0.0.0',
  overlay: {
    error: true
  },
  hot: true,
  historyApiFallback:{
    index:'/public/index.html'
},
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
    module: {
      rules: [{
        test: /\.styl(us)?$/,
        oneOf: [
          // 这里匹配 `<style module>`
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  camelCase: true,
                  localIdentName: '[path][name]---[local]---[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          },
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          {
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          }
        ]
        // use:[
        //     'vue-style-loader',
        //     {
        //         loader:'css-loader',
        //         options: {
        //             modules: true,
        //             camelCase: true,
        //             localIdentName: '[path][name]---[local]---[hash:base64:5]',
        //         }
        //     },
        //     {
        //         loader:'postcss-loader',
        //         options:{
        //             sourceMap:true,
        //         }
        //     },
        //     'stylus-loader'
        // ]
      } ]
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vendor:['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [{
        test: /\.styl(us)?$/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[path][name]---[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
          ]
        })
      } ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[chunkHash:8].css')
    ])
  })
}

module.exports = config
