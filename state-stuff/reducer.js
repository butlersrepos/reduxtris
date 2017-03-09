let GameStates = require('../game-logic/GameStates');
let GameConfig = require('../game-logic/GameConfig');
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
	let config = Object.assign({}, GameConfig, options);

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
			if (!state.currentPiece) {
				return state;
			}

			let newGrid, newCurrentPiece;
			let canFall = canPieceFall(state.gameGrid, state.currentPiece);

			newCurrentPiece = canFall ? state.currentPiece.fall() : state.currentPiece;
			newGrid = composeGrid(state.gameGrid, newCurrentPiece);

			return Object.assign({}, state, {
				currentPiece: canFall ? newCurrentPiece : null,
				gameGrid: newGrid
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

function copyGrid(grid) {
	let newGrid = [];

	grid.forEach(row => {
		let newRow = [];
		newGrid.push(newRow);

		row.forEach(col => newRow.push(col));
	});

	return newGrid;
}

function canPieceFall(grid, preFallPiece) {
	let nextGrid = copyGrid(grid);
	let fallenVersionOfPiece = preFallPiece.fall();
	let valid = true;

	fallenVersionOfPiece.body().forEach(fallingPart => {
		if (fallingPart.row >= 20) {
			valid = false;
			return false;
		}

		let isOurOwnSpace = preFallPiece.body().some(otherPart => otherPart.row == fallingPart.row && otherPart.col == fallingPart.col);
		if (isOurOwnSpace) {
			valid = true;
			return false;
		}

		let isOccupiedSpace = nextGrid[fallingPart.row][fallingPart.col] !== GameConfig.DEFAULT_GRID_SPACE
		if (isOccupiedSpace) {
			valid = false;
			return false;
		}
	});

	return valid;
}