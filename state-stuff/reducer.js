let GameStates = require('../game-logic/GameStates');
let ActionTypes = require('./ActionTypes');
let Piece = require('../game-logic/Piece');
let CLEAR = require('../game-logic/BlockColors').CLEAR;

let PIECE_START_ROW = 0;
let PIECE_START_COL = 5;

let initialState = {
	score: 0,
	level: 0,
	currentPiece: null,
	nextPiece: null,
	gameState: GameStates.BEFORE_START,
	gameGrid: [],
	tickTimer: 1000
};

function generateBaseGrid(options) {
	let config = Object.assign({
		GRID_ROWS: 20,
		GRID_COLUMNS: 10,
		DEFAULT_GRID_SPACE: CLEAR
	}, options);

	let grid = [];

	for (let row = 0; row < config.GRID_ROWS; row++) {
		grid.push([]);

		for (let column = 0; column < config.GRID_COLUMNS; column++) {
			grid[row].push(config.DEFAULT_GRID_SPACE);
		}
	}

	return grid;
}

generateBaseGrid();

module.exports = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.START_GAME:
			return Object.assign({}, state, {
				gameState: GameStates.PLAYING
			});
		case ActionTypes.SET_CURRENT_PIECE:
			let piece = action.value
			piece.setPosition(PIECE_START_ROW, PIECE_START_COL);

			return Object.assign({}, state, {
				currentPiece: piece,
				gameGrid: composeGrid(state.gameGrid, piece)
			});
		case ActionTypes.TICK_GAME:
			if (!state.currentPiece) return state;
			let currentPiece = state.currentPiece.fall();

			let validGrid = false;
			while(!validGrid) {
				validGrid = composeGrid(state.gameGrid, currentPiece);
			}

			return Object.assign({}, state, {
				currentPiece: currentPiece,
				gameGrid: validGrid
			});
		case ActionTypes.ROTATE_PIECE:
			if (!state.currentPiece) return state;
			let rotatedPiece = state.currentPiece.rotate();

			return Object.assign({}, state, {
				currentPiece: rotatedPiece,
				gameGrid: composeGrid(state.gameGrid, rotatedPiece)
			});
		case ActionTypes.SET_TICK_TIME:
			return Object.assign({}, state, {
				tickTimer: action.value
			});
		default:
			return state;
	}
};

function composeGrid(grid, piece) {
	let nextGrid = generateBaseGrid();

	piece.body().forEach(part => {
		nextGrid[part.row][part.col] = piece.color();
	});

	// determine if grid is valid, if not return null
	return nextGrid;
}