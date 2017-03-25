import { level, tickInterval } from '../state-stuff/selectors';

describe('Selectors', () => {
    describe('level selector', () => {
        it('derives the level by dividing lines by 10', () => {
            let mockState = { lines: 28 };
            expect(level(mockState)).toEqual(2);

            mockState = { lines: 31 };
            expect(level(mockState)).toEqual(3);
        });
    });

    describe('tick interval selector', () => {
        it('starts at 1000ms', () => {
            expect(tickInterval({ lines: 0 })).toEqual(1000);
        });

        it('reduces the interval by 50ms per level', () => {
            expect(tickInterval({ lines: 10 })).toEqual(950);
        });

        it('never goes below 100ms', () => {
            expect(tickInterval({ lines: 10000 })).toEqual(100);
        });
    });
});