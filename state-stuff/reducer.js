let GameStates = require('../game-logic/game-states');
let ActionTypes = require('./action-types');
let Piece = require('../game-logic/piece');
let PieceBag = require('../game-logic/piece-bag');
let GameGrid = require('../game-logic/game-grid');
let MoveReducers = require('./reducers/move-reducers');
let GameLoop = require('../game-logic/game-loop');

let starterBag = PieceBag.generateBaggedSet(Piece.Types, 2000);

let initialState = {
	score: 0,
	lines: 0,
	currentPiece: null,
	nextPiece: null,
	gameState: GameStates.BEFORE_START,
	gameGrid: GameGrid.generateBaseGrid(),
	bag: starterBag
};

module.exports = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.START_GAME:
			let startPiece = Piece.create({ type: state.bag.next() });
			let nextPiece = Piece.create({ type: state.bag.next() });
			let newGrid = GameGrid.generateBaseGrid();

			return Object.assign({}, state, {
				gameState: GameStates.PLAYING,
				currentPiece: startPiece,
				nextPiece,
				gameGrid: GameGrid.addPiece(newGrid, startPiece),
				score: 0,
				level: 0
			});
		case ActionTypes.SET_CURRENT_PIECE:
			let piece = action.value;

			return Object.assign({}, state, {
				currentPiece: piece,
				gameGrid: GameGrid.addPiece(state.gameGrid, piece)
			});
		case ActionTypes.TICK_GAME:
			if (!state.currentPiece || state.gameState !== GameStates.PLAYING) {
				return state;
			}
			return GameLoop.update(state, action);
		case ActionTypes.PAUSE_GAME:
			if (state.gameState !== GameStates.PLAYING) return state;
			return Object.assign({}, state, {
				gameState: GameStates.PAUSED
			});
		case ActionTypes.UNPAUSE_GAME:
			if (state.gameState !== GameStates.PAUSED) return state;
			return Object.assign({}, state, {
				gameState: GameStates.PLAYING
			});
		case ActionTypes.DROP_PIECE:
			if (!state.currentPiece || state.gameState !== GameStates.PLAYING) {
				return state;
			}
			return MoveReducers.drop(state);
		case ActionTypes.ROTATE_PIECE:
			if (!state.currentPiece || state.gameState !== GameStates.PLAYING) {
				return state;
			}
			return MoveReducers.rotate(state);
		case ActionTypes.MOVE_LEFT:
			if (!state.currentPiece || state.gameState !== GameStates.PLAYING) {
				return state;
			}
			return MoveReducers.moveLeft(state);
		case ActionTypes.MOVE_RIGHT:
			if (!state.currentPiece || state.gameState !== GameStates.PLAYING) {
				return state;
			}
			return MoveReducers.moveRight(state);
		default:
			return state;
	}
};