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
import './components/pause-menu.tag';

window.Store = createStore(reducerUltimus, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

riot.mount('*');

import GameStates from './game-logic/GameStates';
import Actions from './state-stuff/Actions';

document.addEventListener('keyup', event => {
    switch (event.key) {
        case 'p':
        case 'P':
            let isPaused = Store.getState().gameState == GameStates.PAUSED;
            let action = isPaused ? Actions.unpauseGame() : Actions.pauseGame()
            Store.dispatch(action);
            break;
        case ' ':
        case 'ArrowUp':
            Store.dispatch(Actions.rotatePiece());
            break;
        case 'ArrowRight':
            Store.dispatch(Actions.movePieceRight());
            break;
        case 'ArrowLeft':
            Store.dispatch(Actions.movePieceLeft());
            break;
        case 'ArrowDown':
            Store.dispatch(Actions.dropPiece());
            break;
    }
});