let GameGrid = require('../../game-logic/game-grid');
let GameStates = require('../../game-logic/game-states');
let GameLoop = require('../../game-logic/game-loop');
let Piece = require('../../game-logic/piece');

module.exports = {
    moveLeft,
    moveRight,
    rotate,
    drop,
    move
};

function drop(state) {
    let legallyPositionedPiece = state.currentPiece;
    let proposedPositionPiece = state.currentPiece.fall();

    let canFall;
    while (canFall = GameGrid.canPieceFit(state.gameGrid, legallyPositionedPiece, proposedPositionPiece)) {
        legallyPositionedPiece = proposedPositionPiece;
        proposedPositionPiece = proposedPositionPiece.fall();
    }
    let nextGrid = GameGrid.updatePiece(state.gameGrid, state.currentPiece, legallyPositionedPiece);

    let intermediateState = Object.assign({}, state, { gameGrid: nextGrid });
    return GameLoop.resolvePieceLanding(intermediateState);
}

function move(state, originalPiece, proposedPiece) {
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

function rotate(state) {
    let proposedPiece = state.currentPiece.rotate();
    return move(state, state.currentPiece, proposedPiece);
}

function moveLeft(state) {
    let proposedPiece = state.currentPiece.left();
    return move(state, state.currentPiece, proposedPiece);
}

function moveRight(state) {
    let proposedPiece = state.currentPiece.right();
    return move(state, state.currentPiece, proposedPiece);
}