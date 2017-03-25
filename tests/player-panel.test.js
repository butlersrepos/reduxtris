import { $, create } from './test-utils';
import * as riot from 'riot';
import '../components/player-panel.tag';

let mockSubscribe = jest.fn();
let mockState = jest.fn();

describe('Player Panel', () => {
    window.Store = {
        getState: mockState,
        subscribe: mockSubscribe
    };

    beforeAll(() => {
        mockState.mockReturnValue({
            lines: 51,
            score: 800
        });
        let elem = create('player-panel');
        document.body.appendChild(elem);

        riot.mount(elem);
    });

    it('displays the level', () => {
        expect($('player-panel .level').textContent).toEqual('Level: 5');
    });

    it('displays the level', () => {
        expect($('player-panel .score').textContent).toEqual('Score: 800');
    });

    describe('when the state changes', () => {
        beforeEach(() => {
            mockState.mockReturnValue({
                lines: 109,
                score: 1000
            });

            mockSubscribe.mock.calls[0][0]();
        });

        it('updates the level displayed', () => {
            expect($('player-panel .level').textContent).toEqual('Level: 10');
        });

        it('updates the score displayed', () => {
            expect($('player-panel .score').textContent).toEqual('Score: 1000');
        });
    });
});