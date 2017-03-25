import subject from '../game-logic/game-loop';

jest.mock('../game-logic/game-grid', () => ({
    scoreLines: () => ({ scoredLines: 1, nextGrid: null }),
    didWeLose: () => false,
    addPiece: () => null
}));

jest.mock('../game-logic/piece', () => ({
    create: () => null
}));

describe('Game Loop', () => {
    describe('resolving a landing piece', () => {
        it('scores points if we completed a line', () => {
            let givenState = {
                score: 100,
                bag: { next() { } }
            };

            let nextState = subject.resolvePieceLanding(givenState);
            expect(nextState.score).toEqual(200);
        });
    });
});