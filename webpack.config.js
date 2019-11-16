const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index-bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'babel-loader' },
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8000, // Convert images < 8kb to base64 strings
						name: 'images/[hash]-[name].[ext]',
					},
				}],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	resolve: {
		alias: {
			Apis: path.resolve(__dirname, 'src/js/apis'),
			Components: path.resolve(__dirname, 'src/js/components'),
			Configs: path.resolve(__dirname, 'src/js/configs'),
			Libs: path.resolve(__dirname, 'src/js/libs'),
			Store: path.resolve(__dirname, 'src/js/store'),
			Assets: path.resolve(__dirname, 'src/assets'),
		},
	},
};
