import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    globalObject: 'this',
    library: { name: 'LinkedListLibrary',
      type: 'module',

     },

  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),
//   ],
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/i,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.(?:js|mjs|cjs)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [['@babel/preset-env', { targets: 'defaults' }]],
//           },
//         },
//       },
//     ],
//   },
// };
