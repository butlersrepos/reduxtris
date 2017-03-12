let ActionTypes = require('./ActionTypes');

module.exports = {
	startGame() {
		return { type: ActionTypes.START_GAME };
	},
	tickGame() {
		return { type: ActionTypes.TICK_GAME };
	},
	setCurrentPiece(piece) {
		return {
			type: ActionTypes.SET_CURRENT_PIECE,
			value: piece
		};
	},
	rotatePiece() {
		return {
			type: ActionTypes.ROTATE_PIECE
		};
	},
	pauseGame() {
		return { type: ActionTypes.PAUSE_GAME };
	},
	unpauseGame() {
		return { type: ActionTypes.UNPAUSE_GAME };
	},
	movePieceRight() {
		return { type: ActionTypes.MOVE_RIGHT };
	},
	movePieceLeft() {
		return { type: ActionTypes.MOVE_LEFT };
	},
	dropPiece() {
		return { type: ActionTypes.DROP_PIECE };
	}
};