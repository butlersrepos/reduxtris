import React from 'react';
import { connect } from 'react-redux';

import PlayerPanel from './player-panel.jsx';
import GameView from './game-view.jsx';
import StatsPanel from './stats-panel.jsx';
import StartMenu from './start-menu.jsx';
import PauseMenu from './pause-menu.jsx';
import GameStates from '../game-logic/game-states';

const ReactReduxtris = ({ isPaused }) => (
    <div>
        <PlayerPanel />
        <GameView />
        <StatsPanel />
        <StartMenu />
        {isPaused ? <PauseMenu /> : null}
    </div>
)

const mapStateToProps = state => ({
    isPaused: state.gameState === GameStates.PAUSED
});

export default connect(mapStateToProps, null)(ReactReduxtris)