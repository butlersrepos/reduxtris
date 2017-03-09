let GameStates = require('../game-logic/GameStates');
let ActionTypes = require('./ActionTypes');
let Piece = require('../game-logic/Piece');
let PieceBag = require('../game-logic/PieceBag');
let CLEAR = require('../game-logic/BlockColors').CLEAR;
let GameGrid = require('../game-logic/GameGrid');

let initialState = {
	score: 0,
	level: 0,
	currentPiece: null,
	nextPiece: null,
	gameState: GameStates.BEFORE_START,
	gameGrid: GameGrid.generateBaseGrid(),
	tickTimer: 1000
};

let bag = PieceBag.generateBaggedSet(Piece.Types, 2000);

module.exports = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.START_GAME:
			let startPiece = Piece.create({ type: bag.next() });
			let nextPiece = Piece.create({ type: bag.next() });

			return Object.assign({}, state, {
				gameState: GameStates.PLAYING,
				currentPiece: startPiece,
				nextPiece,
				gameGrid: composeGrid(state.gameGrid, startPiece)
			});
		case ActionTypes.SET_CURRENT_PIECE:
			let piece = action.value;

			return Object.assign({}, state, {
				currentPiece: piece,
				gameGrid: composeGrid(state.gameGrid, piece)
			});
		case ActionTypes.TICK_GAME:
			if (!state.currentPiece || state.gameState == GameStates.PAUSED) {
				return state;
			}

			let newGrid, newCurrentPiece, newNextPiece;
			let canFall = GameGrid.canPieceFall(state.gameGrid, state.currentPiece);

			if (canFall) {
				newCurrentPiece = state.currentPiece.fall();
				newGrid = composeGrid(state.gameGrid, newCurrentPiece);
				newNextPiece = state.nextPiece;
			} else {
				newGrid = composeGrid(state.gameGrid, state.currentPiece);
				newCurrentPiece = state.nextPiece;
				newGrid = composeGrid(newGrid, newCurrentPiece);
				newNextPiece = Piece.create({ type: bag.next() });
			}

			return Object.assign({}, state, {
				currentPiece: newCurrentPiece,
				nextPiece: newNextPiece,
				gameGrid: newGrid
			});
		case ActionTypes.ROTATE_PIECE:
			if (!state.currentPiece) { return state; }

			let canRotate = GameGrid.canPieceRotate(state.gameGrid, state.currentPiece);
			let resultingRotatedPiece = canRotate ? state.currentPiece.rotate() : state.currentPiece;

			return Object.assign({}, state, {
				currentPiece: resultingRotatedPiece,
				gameGrid: composeGrid(state.gameGrid, resultingRotatedPiece)
			});
		case ActionTypes.SET_TICK_TIME:
			return Object.assign({}, state, {
				tickTimer: action.value
			});
		case ActionTypes.PAUSE_GAME:
			return Object.assign({}, state, {
				gameState: GameStates.PAUSED
			});
		case ActionTypes.UNPAUSE_GAME:
			return Object.assign({}, state, {
				gameState: GameStates.PLAYING
			});
		default:
			return state;
	}
};

function composeGrid(grid, piece) {
	let nextGrid = GameGrid.generateBaseGrid();

	piece.body().forEach(part => {
		if (part.row >= 20) debugger;
		if (part.col >= 10) debugger;
		nextGrid[part.row][part.col] = piece.type();
	});

	return nextGrid;
}



