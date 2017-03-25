import subject from '../game-logic/game-grid';
import GameConfig from '../game-logic/game-config';
import { emptyGrid, emptyRow } from './test-utils';

describe('Game Grid', () => {
    let startingGrid;

    beforeEach(() => {
        startingGrid = emptyGrid();
    });

    describe('generating a base grid', () => {
        it('applies defaults from GameConfig', () => {
            let resultGrid = subject.generateBaseGrid();
            expect(resultGrid.length).toBe(GameConfig.GRID_ROWS);

            for (let row = 0; row < GameConfig.GRID_ROWS; row++) {
                expect(resultGrid[row]).toEqual(emptyRow());
            };
        });

        it('allows overriding defaults', () => {
            let config = {
                GRID_ROWS: 2,
                GRID_COLUMNS: 3,
                DEFAULT_GRID_SPACE: 'W'
            };
            let resultGrid = subject.generateBaseGrid(config);
            expect(resultGrid.length).toBe(config.GRID_ROWS);

            let expectedRow = new Array(config.GRID_COLUMNS).fill(config.DEFAULT_GRID_SPACE);
            for (let row = 0; row < config.GRID_ROWS; row++) {
                expect(resultGrid[row]).toEqual(expectedRow);
            };
        });
    });

    describe('when scoring lines', () => {
        it('removes the scored lines and replaces them with empty ones', () => {
            startingGrid[3].fill('L');
            startingGrid[7].fill('J');
            let { scoredLines, nextGrid } = subject.scoreLines(startingGrid);
            expect(nextGrid[3]).toEqual(emptyRow());
            expect(nextGrid[7]).toEqual(emptyRow());
        });

        it('collapses all rows above the scored lines down', () => {
            startingGrid[3][0] = 'L';
            startingGrid[4].fill('J');
            startingGrid[5].fill('J');

            let { scoredLines, nextGrid } = subject.scoreLines(startingGrid);
            expect(nextGrid[5][0]).toBe('L');
        });

        it('scores 0 when no lines are completed', () => {
            let { scoredLines, nextGrid } = subject.scoreLines(startingGrid);
            expect(scoredLines).toBe(0);
        });

        it('scores 1 when a line is completed', () => {
            startingGrid[0].fill('L');
            let { scoredLines, nextGrid } = subject.scoreLines(startingGrid);
            expect(scoredLines).toBe(1);
        });

        it('scores 2 when two lines are completed', () => {
            startingGrid[5].fill('L');
            startingGrid[7].fill('J');
            let { scoredLines, nextGrid } = subject.scoreLines(startingGrid);
            expect(scoredLines).toBe(2);
        });

        it('scores 4 when four lines are completed', () => {
            startingGrid[0].fill('L');
            startingGrid[19].fill('O');
            startingGrid[14].fill('S');
            startingGrid[8].fill('Z');
            let { scoredLines, nextGrid } = subject.scoreLines(startingGrid);
            expect(scoredLines).toBe(4);
        });
    });

    describe('when updating a piece', () => {
        let nonPiece = { body: () => [] };
        let testPiece = {
            type() { return 'TESTPIECE'; },
            body() { return [{ row: 0, col: 0 }]; }
        }

        it('returns a new grid', () => {
            let nextGrid = subject.updatePiece(startingGrid, nonPiece, testPiece);
            expect(nextGrid).not.toBe(startingGrid);
        });

        it('does not mutate the original grid', () => {
            let nextGrid = subject.updatePiece(startingGrid, nonPiece, testPiece);
            expect(startingGrid).toEqual(emptyGrid());
        });

        it('removes the old piece', () => {
            startingGrid[0][0] = 'EXISTINGPIECE';

            let nextGrid = subject.updatePiece(startingGrid, testPiece, nonPiece);
            expect(nextGrid[0][0]).toBe(GameConfig.DEFAULT_GRID_SPACE);
        });

        it('adds the new piece to the new grid', () => {
            let nextGrid = subject.updatePiece(startingGrid, nonPiece, testPiece);
            expect(nextGrid[0][0]).toBe(testPiece.type());
        });
    });
});