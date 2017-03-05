import 'normalize.css';

import { createStore } from 'redux';
import reducerUltimus from './state-stuff/reducer';

import riot from 'riot';
import './components/reduxtris.tag';
import './components/stats-panel.tag';
import './components/start-menu.tag';
import './components/player-panel.tag';
import './components/game-view.tag';
import './components/grid-block.tag';

window.Store = createStore(reducerUltimus, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

riot.mount('*');