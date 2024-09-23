import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
});



// const { merge } = require('webpack-merge');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const common = require('./webpack.common.js');

// module.exports = merge(common, {
//   mode: 'production',
//   devtool: 'source-map',
//   plugins: [new MiniCssExtractPlugin()],
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: [MiniCssExtractPlugin.loader, 'css-loader'],
//       },
//     ],
//   },
// });
