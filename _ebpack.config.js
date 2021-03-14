const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	entry: {
		app: 'app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.[contenthash].js'
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			inject: "head",
			scriptLoading: "defer"
		})
	],
	module: {
		rules: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			use:
				{
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				],
			},
		]
	}
}