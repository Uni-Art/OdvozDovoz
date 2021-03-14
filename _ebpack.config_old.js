// const HtmlWebPackPlugin = require("html-webpack-plugin");

const path = require('path');

module.exports = {
	mode: 'development',

	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			test: /\.js?$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
				// 	query:	{
				// 	presets: ['env']
				// },
			}
			// {
			// 	test: /\.html$/,
			// 	use: [
			// 		{
			// 			loader: "html-loader",
			// 			options: { minimize: true }
			// 		}
			// 	]
			// }
		]
	}
	// ,
	// plugins: [
	// 	new HtmlWebPackPlugin({
	// 		template: "./src/index.html",
	// 		filename: "./index.html"
	// 	})
	// ]
	// devServer: {
	// 	inline: false,
	// 	contentBase: './dist',
	// },
	// module: {
	// 	rules: [{
	// 		test: /\.js?$/,
	// 		exclude: /node_modules/,
	// 		loader: 'babel-loader',
	// 		query: {
	// 			presets:['env']
	// 		}
	// 	}]
	// }
}