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
				loader: 'riot-tag-loader'
			}]
	}
};
