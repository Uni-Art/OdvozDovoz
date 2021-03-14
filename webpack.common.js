const path = require("path");

module.exports = {
	entry: {
		main: "./src/app.js",
		vendor: "./src/vendor.js"
	},
	module: {
		rules: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			use:
				{
					loader: "babel-loader"
				}
		},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[contenthash].[ext]",
						outputPath: "images",
						publicPath: "images",
					}
				}
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: false,
						name: "[name].[contenthash].[ext]",
						outputPath: "fonts",
						publicPath: "fonts",
					},
				}
			},
		]
	}
}