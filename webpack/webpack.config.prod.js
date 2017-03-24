const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeJsPlugin = require("optimize-js-plugin");
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const srcDir = 'public_src';
const outputDir = '../public';

module.exports = {
    devtool: "source-map",
    entry: {
       // 'vendor': path.resolve(srcDir, 'libs.ts'),
        'app': path.resolve(srcDir, 'bootstrap.ts')
    },
    output: {
        path: path.resolve(__dirname,outputDir),// path.resolve(__dirname, './public'),
        filename: '[name].[hash].bundle.js',
        sourceMapFilename: '[name].[hash].map',
        chunkFilename: '[id].[hash].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.component.ts', '.service.ts', '.js', '.component.html', '.component.less', '.less', '.css']
    },
    module: {
        loaders: [
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' }, 
            { test: /(\.component|\.service|)\.ts$/, use: 'ts-loader'},
            { test: /\.component\.html$/, use: 'raw-loader' },
            { test: /(\.component|)\.less$/, use: ['to-string-loader', 'css-loader', 'less-loader'] },
            { test: /\.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}) },
            { test: /\.(png|gif|jpg)$/, use: 'file-loader' },
            // For font-awesome, created by Turbo87:
            // https://gist.github.com/Turbo87/e8e941e68308d3b40ef6
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' }
        ]//,
        //noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true
        }),
        new webpack.ProvidePlugin({
            geojsonvt: 'geojson-vt',
        }),
        new ExtractTextPlugin("[name].[contenthash].css"),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDir, 'index.html'),
            inject: true
        }),
        /*new webpack.ContextReplacementPlugin(
         // The (\\|\/) piece accounts for path separators in *nix and Windows
         /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
         root('./public_src'), // location of your src
         { }
        ),*/
         new webpack.ContextReplacementPlugin(
             /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./public_src')
        ),
        new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'defer'
        }),
        new WebpackCleanupPlugin({
          exclude: ['index.html', 'data/airports.geojson']
        }),
        new OptimizeJsPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ]
};
function root(__path) {
  return path.join(__dirname, __path);
}