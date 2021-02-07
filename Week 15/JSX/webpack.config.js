const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
   entry: {
     index: './src/index.js',
   },
   plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
     title: 'Development',
    }),
    new HtmlWebpackPlugin({
    filename: 'animation.html',
     template: '/animation.html'
    }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devServer: {
    contentBase: './dist',
  },
 };
