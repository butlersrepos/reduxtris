import 'normalize.css';

import './riot-components';
import './react-components/react-reduxtris.jsx'

import './state-stuff';

import './general-controls';
import './main-menu.tag';

let menu = document.createElement('main-menu');
let stagingArea = document.createElement('main');

document.querySelector('body').appendChild(menu);
document.querySelector('body').appendChild(stagingArea);

import riot from 'riot';
riot.mount('main-menu');