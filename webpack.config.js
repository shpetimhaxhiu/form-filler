/**
 * Webpack configuration file
 * 
 * Created by Shpetim Haxhiu (https://pito.dev)
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');

// Create .nojekyll file if it doesn't exist
const createNojekyllFile = () => {
  const nojekyllPath = path.join(__dirname, 'src', '.nojekyll');
  if (!fs.existsSync(nojekyllPath)) {
    fs.writeFileSync(nojekyllPath, '');
    console.log('Created .nojekyll file');
  }
};

// Create .nojekyll file
createNojekyllFile();

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/bookmarklet.js',
    output: {
      filename: isProduction ? 'bookmarklet.min.js' : 'bookmarklet.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isProduction ? '/form-filler/' : '/',
      clean: true,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: true,
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: false // Don't automatically inject scripts as we're creating a bookmarklet
      }),
      new CopyPlugin({
        patterns: [
          { 
            from: 'assets', 
            to: 'assets',
            noErrorOnMissing: true
          },
          {
            from: 'src/.nojekyll',
            toType: 'file',
            to: '.nojekyll'
          }
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: isProduction,
              drop_debugger: isProduction,
            },
            mangle: true
          },
          extractComments: false,
        }),
      ],
    },
    devtool: isProduction ? false : 'source-map',
  };
}; 