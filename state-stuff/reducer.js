let GameStates = require('../game-logic/GameStates');
let ActionTypes = require('./ActionTypes');
let Piece = require('../game-logic/Piece');
let PieceBag = require('../game-logic/PieceBag');
let GameGrid = require('../game-logic/GameGrid');
let MoveReducers = require('./reducers/move-reducers');
let GameLoop = require('../game-logic/GameLoop');

let starterBag = PieceBag.generateBaggedSet(Piece.Types, 2000);

let initialState = {
	score: 0,
	level: 0,
	currentPiece: null,
	nextPiece: null,
	gameState: GameStates.BEFORE_START,
	gameGrid: GameGrid.generateBaseGrid(),
	tickTimer: 1000,
	bag: starterBag
};

module.exports = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.START_GAME:
			let startPiece = Piece.create({ type: state.bag.next() });
			let nextPiece = Piece.create({ type: state.bag.next() });

			return Object.assign({}, state, {
				gameState: GameStates.PLAYING,
				currentPiece: startPiece,
				nextPiece,
				gameGrid: GameGrid.addPiece(state.gameGrid, startPiece)
			});
		case ActionTypes.SET_CURRENT_PIECE:
			let piece = action.value;

			return Object.assign({}, state, {
				currentPiece: piece,
				gameGrid: GameGrid.addPiece(state.gameGrid, piece)
			});
		case ActionTypes.TICK_GAME:
			return GameLoop.update(state, action);
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
		case ActionTypes.DROP_PIECE:
			return MoveReducers.drop(state, action);
		case ActionTypes.ROTATE_PIECE:
			return MoveReducers.rotate(state, action);
		case ActionTypes.MOVE_LEFT:
			return MoveReducers.moveLeft(state, action);
		case ActionTypes.MOVE_RIGHT:
			return MoveReducers.moveRight(state, action);
		default:
			return state;
	}
};