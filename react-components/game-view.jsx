import React from 'react'
import { connect } from 'react-redux'
import Actions from '../state-stuff/actions'
import GridBlock from './grid-block.jsx'

const GameView = ({ rotate, gameGrid }) => (
    <div onClick={rotate}>
        {gameGrid.map((row, rowIndex) => {
            return (
                <div className="game-row" key={rowIndex}>
                    {row.map((col, colIndex) => {
                        return (
                            <GridBlock blockType={ col } key={colIndex} />
                        )
                    })}
                </div >
            )
        })}
    </div >
)

const mapStateToProps = state => ({
    gameGrid: state.gameGrid
})

const mapDispatchToProps = dispatch => ({
    rotate() { dispatch(Actions.rotatePiece()) }
})

export default connect(mapStateToProps)(GameView)