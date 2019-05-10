const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base.js')

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"develpoment"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname,'./template.html')
  })
]

const devServer = {
  port: '8000',
  host: '0.0.0.0',
  overlay: {
    error: true
  },
  hot: true
}

let config

  config = merge(baseConfig, {
    entry:{
      path:path.join(__dirname,'../practice/index.js')
    },
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

      } ]
    },
    resolve:{
      alias:{
       'vue': path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
      }
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })


module.exports = config
