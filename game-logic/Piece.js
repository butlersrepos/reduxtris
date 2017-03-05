let BlockColors = require('./BlockColors');

module.exports = {
    createJ
};

function createJ(y, x, rotation = 0) {
    // xox
    //   x
    let row = y;
    let col = x;
    let currentRotate = rotation % 360;

    return {
        origin() { return { row, col }; },
        fall() {
            return createJ(row + 1, col, currentRotate);
        },
        rotate() {
            return createJ(row, col, currentRotate + 90);
        },
        setPosition(y, x) {
            row = y;
            col = x;
        },
        color() { return BlockColors.LIGHTGRAY },
        body() {

            let parts = [
                { row: row, col: col - 1 },
                { row: row, col: col },
                { row: row, col: col + 1 },
                { row: row + 1, col: col + 1 },
            ];

            switch (currentRotate) {
                case 90:
                    parts[0].row--;
                    parts[0].col++;
                    parts[2].row++;
                    parts[2].col--;
                    parts[3].col = parts[3].col - 2;
                    break;
                case 180:
                    parts[3].row = parts[3].row - 2;
                    parts[3].col = parts[3].col - 2;
                    break;
                case 270:
                    parts[0].row++;
                    parts[0].col++;
                    parts[2].row--;
                    parts[2].col--;
                    parts[3].row = parts[3].row - 2;
                    break;
            }

            return parts;
        }
    };
}