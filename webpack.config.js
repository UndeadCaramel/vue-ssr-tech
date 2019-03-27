const path=require('path')
const VueLoaderPlugin=require('vue-loader/lib/plugin')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const ExtractPlugin=require('extract-text-webpack-plugin')

const isDev=process.env.NODE_ENV==="development"

const config={
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist'),
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.jsx$/,
                use:'babel-loader'
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"develpoment"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]

}

if(isDev){
    config.module.rules.push(
        {
            test:/\.styl(us)?$/,
            use:[
                'style-loader',
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true,
                    }
                },
                'stylus-loader'
            ]
        },
    )
    config.devtool="#cheap-module-eval-source-map"   
    config.devServer={
        port:"8080",
        host:"0.0.0.0",
        overlay:{
            error:true,
        },
        hot:true
    },
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry={
        app:path.join(__dirname,"src/index.js"),
        // vendor:['vue']
    }
    config.output.filename='[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test:/\.styl(us)?$/,
            use:ExtractPlugin.extract({
                fallback:'style-loader',
                use:[
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            })
        },
    )
    config.optimization={
        splitChunks:{
            chunks:'all'
        },
        runtimeChunk:true
    }
    config.plugins.push(
        new ExtractPlugin('styles.[chunkHash:8].css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'runtime'
        // })
    )
}

module.exports=config;