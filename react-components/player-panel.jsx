import React from 'react'
import { level } from '../state-stuff/selectors'
import { connect } from 'react-redux'

const PlayerPanel = ({ level, score }) => (
    <div>
        <h1 className="level">Level: {level}</h1>
        <h1 className="score">Score: {score}</h1>
    </div>
)

const mapStateToProps = state => ({
    level: level(state),
    score: state.score
})

export default connect(mapStateToProps, null)(PlayerPanel)