import GameStates from './game-states';
import GameGrid from './game-grid';
import Piece from './piece';
import award from './score-keeper';

module.exports = {
    update,
    resolvePieceLanding
};

function update(state, action) {
    if (!state.currentPiece || state.gameState !== GameStates.PLAYING) {
        return state;
    }

    if (GameGrid.canPieceFall(state.gameGrid, state.currentPiece)) {
        return Object.assign({}, state, {
            gameGrid: GameGrid.updatePiece(state.gameGrid, state.currentPiece, state.currentPiece.fall()),
            currentPiece: state.currentPiece.fall()
        });
    } else {
        return resolvePieceLanding(state);
    }
}

function resolvePieceLanding(state) {
    let { scoredLines, nextGrid } = GameGrid.scoreLines(state.gameGrid);
    let newScore = state.score + award(scoredLines);
    let lostGame = GameGrid.didWeLose(nextGrid, state.nextPiece);
    nextGrid = GameGrid.addPiece(nextGrid, state.nextPiece);

    return Object.assign({}, state, {
        score: newScore,
        currentPiece: state.nextPiece,
        nextPiece: Piece.create({ type: state.bag.next() }),
        gameGrid: nextGrid,
        gameState: lostGame ? GameStates.GAME_OVER : state.gameState
    });
}
