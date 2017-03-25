let packageConfig = require('./package.json');
let env = process.env.ENV || 'dev';

let Urls = {
	dev: './dist/',
	prod: 'https://s3.us-east-2.amazonaws.com/reduxtris.ericbutler.info/'
};

let srcServer = Urls[env];

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
				loader: 'string-replace-loader',
				query: {
					search: /##srcServer##/g,
					replace: srcServer
				}
			},
			{
				test: /\.(gif|jpg|png|mp3|aac|ogg|m4a)$/,
				loader: 'file-loader'
			},
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
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: packageConfig.babel.presets,
					plugins: packageConfig.babel.plugins
				}
			}
		],
	}
};
