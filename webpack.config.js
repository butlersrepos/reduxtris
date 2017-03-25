let packageConfig = require('./package.json');

module.exports = {
	entry: './main.js',
	output: {
		path: __dirname + '/dist',
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
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: packageConfig.babel.presets,
					plugins: packageConfig.babel.plugins
				}
			}
		],
	}
};
