import GameConfig from '../game-logic/game-config';
import award from '../game-logic/score-keeper';

describe('Score Keeper', () => {
    it('awards the correct amount for no line', () => {
        expect(award(0)).toEqual(GameConfig.POINTS["0"]);
    });

    it('awards the correct amount for one line', () => {
        expect(award(1)).toEqual(GameConfig.POINTS["1"]);
    });

    it('awards the correct amount for two lines', () => {
        expect(award(2)).toEqual(GameConfig.POINTS["2"]);
    });

    it('awards the correct amount for three lines', () => {
        expect(award(3)).toEqual(GameConfig.POINTS["3"]);
    });

    it('awards the correct amount for four lines', () => {
        expect(award(4)).toEqual(GameConfig.POINTS["4"]);
    });
});