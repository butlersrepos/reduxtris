import React from 'react'
import BlockColorChart from '../view-logic/block-color-chart'

export default class GridBlock extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.styles = {
            "--blockColor": BlockColorChart[this.props.blockType]
        }
    }
    
    render() {
        return (
            <div style={this.styles}></div>
        )
    }
}