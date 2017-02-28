import { createStore } from 'redux';
import reducerUltimus from './state-stuff/reducer';

import riot from 'riot';
import './components/message-banner.tag';

window.Store = createStore(reducerUltimus);

riot.mount('*');

Store.dispatch({
	type: 'SET_MESSAGE',
	value: 'Yeah we riotously did!'
});