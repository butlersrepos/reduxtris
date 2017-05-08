import React from 'react';
import { connect } from 'react-redux';
 
import PlayerPanel from './player-panel.jsx';
import GameView from './game-view.jsx';
import StatsPanel from './stats-panel.jsx';
import StartMenu from './start-menu.jsx';
import PauseMenu from './pause-menu.jsx';
import GameStates from '../game-logic/game-states';

class ReactReduxtris extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused: false
        }
    }

    render() {
        return (
            <div>
                <PlayerPanel />
                <GameView />
                <StatsPanel />
                <StartMenu />
                {this.state.isPaused ? <PauseMenu /> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isPaused: state.gameState == GameStates.PAUSED
});

export default connect(mapStateToProps, null)(ReactReduxtris)