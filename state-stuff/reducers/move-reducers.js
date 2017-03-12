let GameGrid = require('../../game-logic/GameGrid');
let GameStates = require('../../game-logic/GameStates');
let Piece = require('../../game-logic/Piece');

module.exports = {
    moveLeft,
    moveRight,
    rotate,
    drop
};

function drop(state, action) {
    let originalPiece = state.currentPiece;
    let proposedPiece = state.currentPiece.fall();

    let canFall = GameGrid.canPieceFit(state.gameGrid, originalPiece, proposedPiece)
    let nextGrid = state.gameGrid;

    while (canFall) {
        nextGrid = GameGrid.updatePiece(nextGrid, originalPiece, proposedPiece);

        originalPiece = proposedPiece;
        proposedPiece = proposedPiece.fall();
        canFall = GameGrid.canPieceFit(nextGrid, originalPiece, proposedPiece)
    }

    nextGrid = GameGrid.scoreLines(nextGrid);
    
    return Object.assign({}, state, {
        gameGrid: nextGrid,
        currentPiece: state.nextPiece,
        nextPiece: Piece.create({ type: state.bag.next() })
    });
}

function move(state, originalPiece, proposedPiece) {
    if (!state.currentPiece || state.gameState !== GameStates.PLAYING) {
        return state;
    }

    let nextGrid;
    let canMove = GameGrid.canPieceFit(state.gameGrid, originalPiece, proposedPiece);

    if (canMove) {
        nextGrid = GameGrid.updatePiece(state.gameGrid, originalPiece, proposedPiece);
    }

    return Object.assign({}, state, {
        gameGrid: canMove ? nextGrid : state.gameGrid,
        currentPiece: canMove ? proposedPiece : originalPiece
    });
}

function rotate(state, action) {
    let proposedPiece = state.currentPiece.rotate();
    return move(state, state.currentPiece, proposedPiece);
}

function moveLeft(state, action) {
    let proposedPiece = state.currentPiece.left();
    return move(state, state.currentPiece, proposedPiece);
}

function moveRight(state, action) {
    let proposedPiece = state.currentPiece.right();
    return move(state, state.currentPiece, proposedPiece);
}