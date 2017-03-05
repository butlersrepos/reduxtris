module.exports = {
	entry: './main.js',
	output: {
		path: './dist',
		filename: 'bundle.js'
	},
	module: {

		loaders: [
			{
				test: /\.tag$/,
				exclude: /node_modules/,
				loader: 'riot-tag-loader',
				query: {
					style: 'scss'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		],
	}
};
