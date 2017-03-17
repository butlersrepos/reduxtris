let GameStates = require('../game-logic/GameStates');
let GameGrid = require('../game-logic/GameGrid');
let Piece = require('../game-logic/Piece');

module.exports = {
    update
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
        newGrid = GameGrid.scoreLines(newGrid);
        newCurrentPiece = state.nextPiece;
        
        let lostGame = GameGrid.didWeLose(newGrid, newCurrentPiece);
        
        newGrid = GameGrid.addPiece(newGrid, newCurrentPiece);
        newNextPiece = Piece.create({ type: state.bag.next() });

        return Object.assign({}, state, {
            currentPiece: newCurrentPiece,
            nextPiece: newNextPiece,
            gameGrid: newGrid,
            gameState: lostGame ? GameStates.GAME_OVER : state.gameState
        });
    }
}
