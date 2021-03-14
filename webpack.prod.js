const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common,{
	mode: "production",
	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	optimization: {
		minimize: true,
		minimizer: [
			// `...`,
			new CssMinimizerPlugin({
				sourceMap: true,
			}),
			new TerserPlugin()
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			inject: "head",
			scriptLoading: "defer",
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true,
			}
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
					 loader: MiniCssExtractPlugin.loader, // Extract css into files
						options: {
						 	publicPath: "css"
						}
					},
					"css-loader",   			 // Turns css into js
					"sass-loader"   			 // Turns sass into css
				],
			},
		]
	}
});