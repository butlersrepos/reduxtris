import { createStore } from 'redux';
import reducerUltimus from './reducer';
window.Store = createStore(reducerUltimus, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());