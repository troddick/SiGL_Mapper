const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeJsPlugin = require("optimize-js-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const srcDir = 'src';
const outputDir = '../dist';

module.exports = {
    devtool: "source-map",
    entry: {
       // 'vendor': path.resolve(srcDir, 'libs.ts'),
        //'app': path.resolve(srcDir, 'app.module.ts')
        'app':  './src/app.module.ts'    //main app.module
    },
    output: {
        path: path.resolve(__dirname,outputDir),
        filename: '[name].[hash].bundle.js',
        sourceMapFilename: '[name].[hash].map',
        chunkFilename: '[id].[hash].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.less', '.css']
    },
    module: {
        loaders: [
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' }, 
            { test: /(\.component|\.service|)\.ts$/, use: 'ts-loader'},
            { test: /\.component\.html$/, use: 'raw-loader' },
            { test: /(\.component|)\.less$/, use: ['to-string-loader', 'css-loader', 'less-loader'] },
            { test: /\.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}) },
            { test: /\.(png|gif|jpg)$/, use:'file-loader'},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: '[path][name].[ext]'} } ]},
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: '[path][name].[ext]'} } ]},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: '[path][name].[ext]'} } ]},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: '[path][name].[ext]'} } ]},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: '[path][name].[ext]'} } ]}
        ]
      //  noParse: /node_modules|angular2|bundles/
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
         root('./src'), // location of your src
         { }
        ),*/
         new webpack.ContextReplacementPlugin(
             /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src')
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
        }),
        new CopyWebpackPlugin([
          { from: 'src/assets', to: 'assets' },        
          { from: 'node_modules/font-awesome/css/font-awesome.min.css', to: 'assets/font-awesome/css/font-awesome.min.css'},
          { from: 'node_modules/font-awesome/fonts', to: 'assets/font-awesome/fonts'},          
          { from: 'node_modules/wim-styles/core/css/wim.css', to: 'assets/wim-styles/css/wim.css'}//,
        //  { from: 'node_modules/bootstrap/dist/css/bootstrap.css', to: 'assets/bootstrap/css/bootstrap.css'}
      ])
    ]
};
function root(__path) {
  return path.join(__dirname, __path);
}