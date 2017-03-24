const webpack = require('webpack'); //to access builtin plugins
const path = require('path'); //needed to resolve output path

const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const srcDir = 'public_src';
const outputDir = './public';

module.exports = {
    devtool: "eval",
    entry: {       
        //'vendor': path.resolve(srcDir, 'libs.ts'),
        'app': path.resolve(srcDir, 'bootstrap.ts')
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].[hash].bundle.js',
        sourceMapFilename: '[name].[hash].map',
        chunkFilename: '[id].[hash].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.component.ts', '.service.ts', '.js', '.component.html', '.component.less', '.less', '.css']
    },
    module: {       
        rules: [
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },  
            { test: /(\.component|\.service|)\.ts$/, use: ['ts-loader'] },
            { test: /\.component\.html$/, use: ['raw-loader'] },
            { test: /(\.component|)\.less$/, use: ['to-string-loader', 'css-loader', 'less-loader'] },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
            { test: /\.(png|gif|jpg)$/, use: 'file-loader' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader' }
        ]//,
       // noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            geojsonvt: 'geojson-vt',
        }),
        new ExtractTextPlugin("[name].[contenthash].css"),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDir, 'index.html'),
            inject: true
        }),
        /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      /*  new webpack.ContextReplacementPlugin(
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
        new webpack.LoaderOptionsPlugin({debug:true})
    ]
};
function root(__path) {
  return path.join(__dirname, __path);
}