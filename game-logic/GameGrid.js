let GameConfig = require('../game-logic/GameConfig');

module.exports = {
	canPieceFall,
	canPieceRotate,
	canPieceFit,
	generateBaseGrid
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