const path=require('path')

const isDev=process.env.NODE_ENV==="development"

const config={
    mode:process.env.NODE_ENV||"development",
    target:'web',
    entry:path.join(__dirname,'../src/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'../dist'),
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
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/,
                include:__dirname+'src'
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'resource/[path][name][hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },

}

module.exports=config;