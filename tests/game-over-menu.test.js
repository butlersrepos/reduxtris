import * as riot from 'riot';
import { $, $$, create, triggerClick } from './test-utils';
import gameOverMenu from '../components/game-over-menu.tag';

describe('Game Over Menu', () => {
    let mockDispatch = jest.fn();

    beforeAll(() => {
        window.Store = { dispatch: mockDispatch };

        const elem = create('game-over-menu');
        document.body.appendChild(elem)

        riot.mount(elem);
    });

    it('should contain the Play Again button', () => {
        expect($('game-over-menu button').textContent).toBe('Play Again?');
    });

    it('should initially not show the Play Again button', () => {
        expect($('game-over-menu button').classList).not.toContain('visible');
    });

    it('should show the button after some time', () => {
        jest.runTimersToTime(5500);
        expect($('game-over-menu button').classList).toContain('visible');
    });

    it('should restart the game when the button is clicked', () => {
        triggerClick('game-over-menu button');
        expect(mockDispatch).toBeCalled();
    });
});