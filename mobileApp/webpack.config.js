const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
// console.log(process.env, process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === 'development';
var config = {
    entry: { index:path.join(__dirname, "src/index.js")},
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options:{
                    presets:["env","es2015"],
                    plugins:["transform-runtime"]
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLPlugin({
          title:'helloNovel',
          template: './src/template.html', // 源模板文件
          filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
          showErrors: true,
          inject: true,
          chunks: "all"
        })
    ]

}
if(isDev){
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            erros:true
        },
        proxy: {
            '/api':{
                target:"http://0.0.0.0:8003",
                changeOrigin: true,
                logLevel:'debug'
            }
        }
    };
}

module.exports = config;
