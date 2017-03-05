module.exports = {
    Z(row, col) {
        return [
            { row: row, col: col - 1 },
            { row: row, col: col },
            { row: row + 1, col: col },
            { row: row + 1, col: col + 1 }
        ];
    },
    T(row, col) {
        return [
            { row: row, col: col - 1 },
            { row: row, col: col },
            { row: row, col: col + 1 },
            { row: row + 1, col: col + 1 }
        ];
    },
    S(row, col) {
        return [
            { row: row, col: col },
            { row: row, col: col + 1 },
            { row: row + 1, col: col - 1 },
            { row: row + 1, col: col }
        ];
    },
    L(row, col) {
        return [
            { row: row, col: col - 1 },
            { row: row, col: col },
            { row: row, col: col + 1 },
            { row: row + 1, col: col - 1 }
        ];
    },
    I(row, col) {
        return [
            { row: row - 1, col: col },
            { row: row, col: col },
            { row: row + 1, col: col },
            { row: row + 2, col: col },
        ];
    },
    O(row, col) {
        // xo
        // xx
        return [
            { row: row, col: col - 1 },
            { row: row, col: col },
            { row: row + 1, col: col - 1 },
            { row: row + 1, col: col }
        ];
    },
    J(row, col) {
        // xox
        //   x
        return [
            { row: row, col: col - 1 },
            { row: row, col: col },
            { row: row, col: col + 1 },
            { row: row + 1, col: col + 1 }
        ];
    },
    adjustRotationJ(parts, currentRotation) {
        switch (currentRotation) {
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
}
