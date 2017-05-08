import GameStates from './game-logic/game-states';
import Actions from './state-stuff/actions';

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