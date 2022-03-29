const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalizerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports =
{
    entry:'./src/index.js',
    output:
    {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename:'assets/images/[hash][ext][query]'
    },
    mode:'development',
    devtool: 'source-map',
    resolve:
    {
        extensions:['.js'],
        alias:{
            '@utils':path.resolve(__dirname, 'src/utils/'), //el @ significa que la palabra es un alias y para llamar el alias tambien se dbee hacer con el @
            '@styles':path.resolve(__dirname, 'src/styles/'),
            '@templates':path.resolve(__dirname, 'src/templates/'),
            '@assets':path.resolve(__dirname, 'src/assets/'),
        }
    },
    module:
    {
        rules:[
            {
            test:/\.m?js$/,
            exclude:/node_modules/,
            use:{
                loader:'babel-loader'
            }
        },
        {
            test:/\.css$/i,
            use:[
                miniCssExtractPlugin.loader, 'css-loader'
            ]
        },
        {
            test:/\.png/,
            type:'asset/resource'
        },
        {
            test:/\.(woff | woff2)$/,
            use:{
                loader:'url-loader',
                options:{
                    limit:10000,
                    mimetype:'application/font-woff',
                    name:"[name].[ext]",
                    outputPat:"./assets/fonts/",
                    publicPath:"../assets/fonts/",
                    esModule:false
                }
            }
        }
    ]
    },
    plugins:[
        new htmlWebpackPlugin({
            inject:'body',
            template:'./public/index.html',
            filename:'./index.html'
        }),
        new miniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[{
                from: path.resolve(__dirname, 'src', 'assets/images'),
                to:'assets/images'
            }]
        }),
        new Dotenv(),
        new BundleAnalizerPlugin()
    ],
    devServer: 
    {
        static:path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port:3006,
        open:true
    },
    
}