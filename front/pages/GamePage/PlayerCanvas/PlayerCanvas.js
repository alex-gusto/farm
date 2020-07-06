import api from '~/front/api'
import BaseModal from 'base/BaseModal';
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import FarmAnimal from '~/front/components/FarmAnimal'
import AnimalsMarket from '~/front/components/AnimalsMarket'
import DiceRoll from '~/front/components/DiceRoll'

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
                    <button onClick={this.openDice}>Throw Dice</button>
                    <button onClick={this.openMarket}>Market</button>
                </div>

                <div className="farm-grid">
                    {
                        farm.map((animal, key) => <FarmAnimal key={key} {...animal} className={`farm-animal--${key}`}/>)
                    }
                </div>

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
