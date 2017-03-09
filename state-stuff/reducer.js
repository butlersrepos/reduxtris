let GameStates = require('../game-logic/GameStates');
let GameConfig = require('../game-logic/GameConfig');
let ActionTypes = require('./ActionTypes');
let Piece = require('../game-logic/Piece');
let PieceBag = require('../game-logic/PieceBag');
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

let bag = PieceBag.generateBaggedSet(Piece.Types, 2000);

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
			let startPiece = Piece.create({ type: bag.next() });
			let nextPiece = Piece.create({ type: bag.next() });

			return Object.assign({}, state, {
				gameState: GameStates.PLAYING,
				currentPiece: startPiece,
				nextPiece,
				gameGrid: composeGrid(state.gameGrid, startPiece)
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

			let newGrid, newCurrentPiece, newNextPiece;
			let canFall = canPieceFall(state.gameGrid, state.currentPiece);

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

			let canRotate = canPieceRotate(state.gameGrid, state.currentPiece);
			let resultingRotatedPiece = canRotate ? state.currentPiece.rotate() : state.currentPiece;

			return Object.assign({}, state, {
				currentPiece: resultingRotatedPiece,
				gameGrid: composeGrid(state.gameGrid, resultingRotatedPiece)
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
		if (part.row >= 20) debugger;
		if (part.col >= 10) debugger;
		nextGrid[part.row][part.col] = piece.type();
	});

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
	return canPieceFit(nextGrid, preFallPiece, fallenVersionOfPiece);
}

function canPieceRotate(grid, preRotatePiece) {
	let nextGrid = copyGrid(grid);
	let rotatedPiece = preRotatePiece.rotate();
	return canPieceFit(nextGrid, preRotatePiece, rotatedPiece);
}

function canPieceFit(grid, original, proposed) {
	let valid = true;

	proposed.body().forEach(futurePart => {
		if (futurePart.row < 0 || futurePart.row >= GameConfig.GRID_ROWS || futurePart.col < 0 || futurePart.col >= GameConfig.GRID_COLUMNS) {
			valid = false;
			return;
		}

		let isOurOwnSpace = original.body().some(originalPart => originalPart.row == futurePart.row && originalPart.col == futurePart.col);
		if (isOurOwnSpace) { return; }

		let isOccupiedSpace = grid[futurePart.row][futurePart.col] !== GameConfig.DEFAULT_GRID_SPACE
		if (isOccupiedSpace) { valid = false; }
	});

	return valid;
}