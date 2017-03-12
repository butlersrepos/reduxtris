let quadrantMap = {
	'-1': {
		'-1': 4,
		'1': 1
	},
	'1': {
		'-1': 3,
		'1': 2
	}
};

let quadrantDefinition = {
	1: [-1, 1],
	2: [1, 1],
	3: [1, -1],
	4: [-1, -1]
}

function Part(rowRelativeToOrigin, colRelativeToOrigin, isOrigin = false) {
	return {
		rowRelativeToOrigin: isOrigin ? 0 : rowRelativeToOrigin,
		colRelativeToOrigin: isOrigin ? 0 : colRelativeToOrigin,
		row: isOrigin ? rowRelativeToOrigin : undefined,
		col: isOrigin ? colRelativeToOrigin : undefined,
		isOrigin
	};
}



function Shape(parts) {
	let myParts = parts.slice(0);
	let originPart = myParts.filter(p => p.isOrigin)[0];

	let worldPositionedParts = myParts.map(decorateWorldPositionForPart);

	function decorateWorldPositionForPart(p) {
		if (p.isOrigin) return p;

		p.row = originPart.row + p.rowRelativeToOrigin;
		p.col = originPart.col + p.colRelativeToOrigin;
		return p;
	}

	return {
		parts() { return worldPositionedParts; },
		origin() {
			let originPart = myParts.filter(p => p.isOrigin);
			return originPart[0];
		},
		rotate() {
			myParts = myParts.map(part => {
				if (part.isOrigin) { return part; }

				let rowMagnitude = Math.abs(part.rowRelativeToOrigin);
				let rowSign = Math.sign(part.rowRelativeToOrigin);

				let colMagnitude = Math.abs(part.colRelativeToOrigin);
				let colSign = Math.sign(part.colRelativeToOrigin);

				let quadrant = quadrantMap[rowSign || 1][colSign || 1];
				let destinationQuandrant = quadrant + 1 > 4 ? 1 : quadrant + 1;
				let quadrantSigns = quadrantDefinition[destinationQuandrant];

				part.rowRelativeToOrigin = colMagnitude * quadrantSigns[0];
				part.colRelativeToOrigin = rowMagnitude * quadrantSigns[1];
				return decorateWorldPositionForPart(part);
			});
		}
	}
}

module.exports = {
	Z(row, col) {
		return Shape([
			Part(0, -1),
			Part(row, col, true),
			Part(1, 0),
			Part(1, 1)
		]);
	},
	T(row, col) {
		return Shape([
			Part(0, -1),
			Part(row, col, true),
			Part(0, 1),
			Part(1, 0)
		]);
	},
	S(row, col) {
		return Shape([
			Part(row, col, true),
			Part(0, 1),
			Part(1, -1),
			Part(1, 0)
		]);
	},
	L(row, col) {
		return Shape([
			Part(0, -1),
			Part(row, col, true),
			Part(0, 1),
			Part(1, -1)
		]);
	},
	I(row, col) {
		return Shape([
			Part(-1, 0),
			Part(row, col, true),
			Part(1, 0),
			Part(2, 0)
		]);
	},
	O(row, col) {
		return Shape([
			Part(0, -1),
			Part(row, col, true),
			Part(1, -1),
			Part(1, 0)
		]);
	},
	J(row, col) {
		return Shape([
			Part(0, -1),
			Part(row, col, true),
			Part(0, 1),
			Part(1, 1)
		]);
	}
}
