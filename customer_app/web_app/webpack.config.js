var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('distribution'),
    filename: '[name].[fullhash].js',
    publicPath: '/'
  },
  // enable source-map for debugging webpack's output
  devtool: "source-map",
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
	test: /\.jsx?$/,
	exclude: /(node_modules|bower_components)/,
	loader: 'babel-loader',
	options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
	}
      },
      {
	test: /\.tsx?$/,
	loader: "awesome-typescript-loader"
      },
      {
        test: /\.ts?$/,
	loader: "ts-loader",
      },
      {
	test: /\.css$/,
	loader: 'style-loader'
      }, {
	test: /\.css$/,
	loader: 'css-loader',
	options: {
          modules: true,
	  sourceMap: true,
          importLoaders: 1,
	  esModule: false,
	}
      },
      {
	// all output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
	test: /\.(js|jsx)$/,
	use: ["source-map-loader"],
	enforce: "pre",
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      hash: true,
    })
  ],
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    },
    watchFiles: {
      paths: ["./src/"],
    },
    proxy: {
      '/web_api': {
	target: {
	  host: "0.0.0.0",
	  protocol: 'http:',
	  port: 8081,
	},
	pathRewrite: {
	  '^/web_api': ''
	},
      }
    },
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      web_api: 'web_api',
    })
  }
}
