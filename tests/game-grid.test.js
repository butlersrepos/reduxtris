import subject from '../game-logic/game-grid';

describe('Game Grid', () => {
    describe('when scoring lines', () => {
        let givenGrid = [[], []];

        it('scores 0 when no lines are completed', () => {
            let {scoredLines, nextGrid} = subject.scoreLines(givenGrid);
            expect(scoredLines).toBe(0);
        });
    });
});