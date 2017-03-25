let GameStates = require('../game-logic/game-states');
let GameGrid = require('../game-logic/game-grid');
let Piece = require('../game-logic/piece');

module.exports = {
    update,
    resolvePieceLanding
};

function update(state, action) {
    if (!state.currentPiece || state.gameState !== GameStates.PLAYING) {
        return state;
    }

    let newGrid = state.gameGrid;
    let newCurrentPiece;
    let newNextPiece = state.nextPiece;
    let canFall = GameGrid.canPieceFall(state.gameGrid, state.currentPiece);

    if (canFall) {
        newCurrentPiece = state.currentPiece.fall();

        return Object.assign({}, state, {
            currentPiece: newCurrentPiece,
            gameGrid: GameGrid.updatePiece(newGrid, state.currentPiece, newCurrentPiece)
        });
    } else {
        return resolvePieceLanding(state, action);
    }
}

function resolvePieceLanding(state, action) {
    let {scoredLines, nextGrid} = GameGrid.scoreLines(state.gameGrid);
    let newCurrentPiece = state.nextPiece;

    let lostGame = GameGrid.didWeLose(nextGrid, newCurrentPiece);
    nextGrid = GameGrid.addPiece(nextGrid, newCurrentPiece);

    return Object.assign({}, state, {
        currentPiece: newCurrentPiece,
        nextPiece: Piece.create({ type: state.bag.next() }),
        gameGrid: nextGrid,
        gameState: lostGame ? GameStates.GAME_OVER : state.gameState
    });
}
