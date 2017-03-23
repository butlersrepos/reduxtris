let GameStates = require('../game-logic/GameStates');
let GameGrid = require('../game-logic/GameGrid');
let Piece = require('../game-logic/Piece');

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
    let newGrid = GameGrid.scoreLines(state.gameGrid);
    let newCurrentPiece = state.nextPiece;

    let lostGame = GameGrid.didWeLose(newGrid, newCurrentPiece);
    newGrid = GameGrid.addPiece(newGrid, newCurrentPiece);

    return Object.assign({}, state, {
        currentPiece: newCurrentPiece,
        nextPiece: Piece.create({ type: state.bag.next() }),
        gameGrid: newGrid,
        gameState: lostGame ? GameStates.GAME_OVER : state.gameState
    });
}
