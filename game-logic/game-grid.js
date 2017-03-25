let GameConfig = require('../game-logic/game-config');

module.exports = {
	canPieceFall,
	canPieceRotate,
	canPieceFit,
	generateBaseGrid,
	addPiece,
	updatePiece,
	scoreLines,
	didWeLose
};

function didWeLose(grid, incomingPiece) {
	return incomingPiece.body().some(part => grid[part.row][part.col] !== GameConfig.DEFAULT_GRID_SPACE);
}

function newEmptyRow() {
	let row = [];
	for (let x = 0; x < GameConfig.GRID_COLUMNS; x++) {
		row.push(GameConfig.DEFAULT_GRID_SPACE);
	}
	return row;
}

function scoreLines(grid) {
	let nextGrid = copyGrid(grid);

	nextGrid = nextGrid.filter(row => {
		return row.some(val => val === GameConfig.DEFAULT_GRID_SPACE)
	});

	let scoredLines = GameConfig.GRID_ROWS - nextGrid.length;

	while (nextGrid.length < GameConfig.GRID_ROWS) {
		nextGrid.unshift(newEmptyRow());
	}

	return { scoredLines, nextGrid };
}

function updatePiece(grid, oldPiece, newPiece) {
	let nextGrid = copyGrid(grid);

	oldPiece.body().map(part => nextGrid[part.row][part.col] = GameConfig.DEFAULT_GRID_SPACE);
	newPiece.body().map(part => nextGrid[part.row][part.col] = newPiece.type());

	return nextGrid;
}

function addPiece(grid, piece) {
	let nextGrid = copyGrid(grid);

	piece.body().forEach(part => {
		nextGrid[part.row][part.col] = piece.type();
	});

	return nextGrid;
}

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

	grid.forEach(row => newGrid.push(row.slice(0)));

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