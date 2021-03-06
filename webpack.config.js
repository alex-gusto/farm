const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: [ './front/index.js' ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: [ /\.js$/, /\.jsx$/ ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
    ]
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
    alias: {
      '~': path.resolve(__dirname, '.'),
      '@': path.resolve(__dirname, './front'),
      'base': path.resolve(__dirname, './front/components/base'),
      'assets': path.resolve(__dirname, './front/assets'),
      utils: path.resolve(__dirname, './utils')
    }
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },

  plugins: [
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new HtmlWebpackPlugin({
      title: 'Farm game',
      template: './template.ejs',
      inject: 'body'
    }),
    new webpack.EnvironmentPlugin([ 'NODE_ENV', 'API_URL', 'SOCKET_URL' ])
  ]
}
