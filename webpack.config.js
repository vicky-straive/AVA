const path = require('path');

module.exports = {
  entry: './app/layout.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Translates CSS into CommonJS modules
          'sass-loader',  // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/,  // This rule is specifically for handling CSS files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Translates CSS into CommonJS modules
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
