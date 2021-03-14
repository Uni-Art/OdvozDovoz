const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "development",
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			inject: "head",
			scriptLoading: "defer"
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [

					//"style-loader", // Inject styles into DOM
					{
						loader: MiniCssExtractPlugin.loader, // Extract css into files
						options: {
							publicPath: "css"
						}
					},
					"css-loader",   // Turns css into js
					"sass-loader"   // Turns sass into css
				],
			},
		]
	}
});