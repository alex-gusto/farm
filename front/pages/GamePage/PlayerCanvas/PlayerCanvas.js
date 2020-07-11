import api from '~/front/api'
import BaseModal from 'base/BaseModal';
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import AnimalsMarket from '~/front/components/AnimalsMarket'
import DiceRoll from '~/front/components/DiceRoll'
import FarmGrid from '~/front/components/FarmGrid'

class PlayerCanvas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isMarketOpen: false,
            isDiceOpen: false
        }
    }

    get gameId() {
        const { match: { params: { gameId } } } = this.props
        return gameId
    }

    openMarket = () => {
        this.setState({
            isMarketOpen: true
        })
    }

    closeMarket = () => {
        this.setState({
            isMarketOpen: false
        })
    }

    openDice = () => {
        this.setState({
            isDiceOpen: true
        })
    }

    closeDice = () => {
        this.setState({
            isDiceOpen: false
        })
    }

    render() {
        const { farm, turn, name } = this.props
        const { isMarketOpen, isDiceOpen } = this.state

        return (
            <div className="player-canvas" style={{ pointerEvents: turn ? 'auto' : 'none' }}>

                <h2 className="player-name">Your name is {name}</h2>

                <div className="game-controls">
                    <button className="btn btn-outline-primary btn-sm" disabled={!turn} onClick={this.openDice}>Throw Dice</button>
                    <button className="btn btn-outline-primary btn-sm ml-2" disabled={!turn} onClick={this.openMarket}>Market</button>
                </div>

                <FarmGrid farm={farm}/>

                <BaseModal isOpen={isMarketOpen} closeModal={this.closeMarket}>
                    <AnimalsMarket onClose={this.closeMarket}/>
                </BaseModal>

                <BaseModal isOpen={isDiceOpen} closeModal={this.closeDice}>
                    <DiceRoll onClose={this.closeDice} gameId={this.gameId}/>
                </BaseModal>
            </div>
        )
    }
}

export default withRouter(PlayerCanvas)
