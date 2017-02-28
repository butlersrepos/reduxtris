# How I Started This
This project was started with a goal of staying out of googling or the browser as much as possible, except to run and test the app.

## Commands

`mkdir reduxtris`

`cd reduxtris`

`npm init -y`

I forgot what the module was for webpack to load riot `.tag` files so I 

`npm search webpack riot`

```
λ npm search webpack riot
npm WARN notice update to the newest npm client for improved search results: npmjs.com/get-npm
NAME                     DESCRIPTION                                                 AUTHOR           DATE       VERSION KEYWORDS
befe-riotjs-loader       riotjs module loader for webpack with module separation     =baidu-befe      2016-05-18 0.1.3
generator-webpack-riotjs A base setup with riotjs and webpack, babel, autoprefixer.… =opture          2015-06-15 0.6.0
nest-loader              riotjs module loader for webpack                            =fengzilong      2016-08-31 0.1.1
riot-plain-loader        A loader for WebPack which minifies HTML right inside of…   =ilearnio        2016-03-05 0.0.3
riot-tag-loader          Riot official webpack loader                                =gianlucaguarini 2017-01-29 1.0.0
riotjs-loader            riotjs module loader for webpack                            =esnunes         2017-01-17 4.0.0
riottag-loader           A webpack loader for Riot.js that compiles tags             =tokyoincode     2016-11-29 0.0.2
tag-loader               Riot tag file loader for Webpack                            =srackham        2015-02-04 0.3.0
tag-pug-loader           Integrating RiotJS with PugJs (ex Jade) in a Webpack loader =dumconstantin   2016-09-25 1.0.0
```

I did a quick `npm view` on `riotjs-loader` and `riot-tag-loader` and noticed that `riot-tag-loader` is described as the "Official" loader for Riot and has tests while `riotjs-loader` is/has neither going for it.

`npm i webpack riot redux riot-tag-loader --save`

I drew a blank and tried to run `webpack init` to no avail so... `touch webpack.config.js` and opened it in VSCode

``` 
///webpack.config.js v1.0
export default {
	entry: './main.js',
	output: {
		destination: './dist',
		filename: 'bundle.js'
	}
}
```

Then we make an entry file to test it out.
```
///main.js
import { createStore } from 'redux';
```

```
λ .\node_modules\.bin\webpack
SyntaxError: Unexpected token export
```

So I am trying that ES6 shit, guess it's back to standard?

``` 
///webpack.config.js v2.0
module.exports = {
	entry: './main.js',
	output: {
		destination: './dist',
		filename: 'bundle.js'
	}
};
```

```
λ .\node_modules\.bin\webpack
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
configuration.output has an unknown property 'destination'. These properties are valid:
object { auxiliaryComment?, chunkFilename?, crossOriginLoading?, devtoolFallbackModuleFilenameTemplate?, devtoolLineToLine?, devtoolModuleFilenameTemplate?, filename?, hashDigest?, hashDigestLength?, hashFunction?, hotUpdateChunkFilename?, hotUpdateFunction?, hotUpdateMainFilename?, jsonpFunction?, library?, libraryTarget?, path?, pathinfo?, publicPath?, sourceMapFilename?, sourcePrefix?, strictModuleExceptionHandling?, umdNamedDefine? }
Options affecting the output of the compilation. `output` options tell webpack how to write the compiled files to disk.
```

Maybe it was path?

``` 
///webpack.config.js v3.0
module.exports = {
	entry: './main.js',
	output: {
		path: './dist',
		filename: 'bundle.js'
	}
};
```

```
λ .\node_modules\.bin\webpack
Hash: 1713af37510b86c385e4
Version: webpack 2.2.1
Time: 250ms
    Asset     Size  Chunks             Chunk Names
bundle.js  43.3 kB       0  [emitted]  main
   [1] ./~/lodash-es/isPlainObject.js 1.65 kB {0} [built]
   [2] ./~/process/browser.js 5.3 kB {0} [built]
   [3] ./~/redux/es/compose.js 965 bytes {0} [built]
   [4] ./~/redux/es/createStore.js 8.79 kB {0} [built]
   [5] ./~/redux/es/utils/warning.js 637 bytes {0} [built]
   [7] ./~/redux/es/index.js 1.08 kB {0} [built]
   [8] ./~/lodash-es/_baseGetTag.js 790 bytes {0} [built]
  [10] ./~/lodash-es/_getPrototype.js 161 bytes {0} [built]
  [15] ./~/lodash-es/isObjectLike.js 612 bytes {0} [built]
  [16] ./~/redux/es/applyMiddleware.js 1.8 kB {0} [built]
  [17] ./~/redux/es/bindActionCreators.js 1.98 kB {0} [built]
  [18] ./~/redux/es/combineReducers.js 5.58 kB {0} [built]
  [19] ./~/symbol-observable/index.js 41 bytes {0} [built]
  [20] ./~/symbol-observable/lib/index.js 661 bytes {0} [built]
  [23] ./main.js 36 bytes {0} [built]
    + 9 hidden modules
```

### BOOM!
Time to see if it actually built anything

```html
///index.html
<html>
	<head>
		<script src="./dist/bundle.js"></script>
	</head>
	<body>
		Did we do it?
	</body>
</html>
```

`open index.html`

I see my text, that's  a start. Now instead of opening the console and trying to make a store (like a dirty cheater) I'm gonna try to use the Redux store right away.

## state-stuff/reducer.js
```js
let initialState = {
	message: ''
};

module.exports = function (state, action) {
	let mergedState = Object.assign({}, initialState, state);
	let nextState = JSON.parse(JSON.stringify(mergedState));

	switch (action.type) {
		case 'SET_MESSAGE':
			nextState.message = action.value;
			break;
		default:
			return state;
	}
};
```

## main.js
```js
import { createStore } from 'redux';
import reducerUltimus from './state-stuff/reducer';

window.Store = createStore(reducerUltimus);

Store.subscribe(() => {
	document.getElementById('message-banner').innerHTML = Store.getState().message;
});

Store.dispatch({
	type: 'SET_MESSAGE',
	value: 'Yeah we fucking did!'
});
```

## index.html
```html
<html>
	<head>
	</head>
	<body>
		Did we do it?
		<h1 id="message-banner"></h1>
		<script src="./dist/bundle.js"></script>
	</body>
</html>
```

## Beginning Proper Dev Flow
`./node_modules/.bin/webpack -w` to setup the watcher. Then I immediately find several errors I made (and ret-conned!).
- My bundle.js should be included at the end of my markup so it runs afterward
- I forgot to define an initialState
- I forgot to return nextState :facepalm:

But after all that, which took me a handful of minutes to correct, we're ready to go!

## Niceties
- Adding the `webpack` script to our `package.json` for ease of access
```js
"scripts": {
	"dev": "webpack -w"
}
```
- Next we need to add the riottag-loader so we can start making components, this step required me to google up the config was `webpack` although I did do `npm home riot-tag-loader` instead of traveling through the Great Gooj
## Our new-improved wepback config
```js
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
```
This kind of config looks pretty obvious afterward but also it only took one console command to bring me right to it so why remember it? O_O

## Our First Riot Component `components/message-banner.tag`
```html
<message-banner>
	<h1>{ message }</h1>

	<script>
		extractMyState() {
			this.message = Store.getState().message
			this.update()
		}

		Store.subscribe(() => {
			this.extractMyState()
		})
	</script>
</message-banner>
```

## Add Riot and the component to our entry point, main.js
```js
import { createStore } from 'redux';
import reducerUltimus from './state-stuff/reducer';

import riot from 'riot';
import './components/message-banner.tag';

window.Store = createStore(reducerUltimus);

// Could inject the Store but I'm just gonna refer to window.Store everywhere instead :)
riot.mount('*');

Store.dispatch({
	type: 'SET_MESSAGE',
	value: 'Yeah we riotously did!'
});
```
