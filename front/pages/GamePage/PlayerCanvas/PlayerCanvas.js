import BaseModal from 'base/BaseModal'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Components
import DiceRoll from '~/front/components/DiceRoll'
import QuizBonus from '~/front/components/QuizBonus'
import FarmGrid from '~/front/components/FarmGrid'

// Mixins
import MarketExchangeMixin from './MarketExchange.mixin'

// Providers
import { NotificationContext } from '~/front/providers/NotificationProvider'

// Utils
import get from 'lodash/get'
import compose from 'lodash/fp/compose'

class PlayerCanvas extends Component {
    static contextType = NotificationContext

    constructor(props) {
        super(props)

        this.state = {
            isDiceOpen: false,
            isQuizOpen: false,
            formData: {
                from: undefined,
                to: undefined,
                count: ''
            }
        }
    }

    get gameId() {
        const { match: { params: { gameId } } } = this.props
        return gameId
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

    openQuizBonus = () => {
        this.setState({
            isQuizOpen: true
        })
    }

    closeQuizBonus = () => {
        this.setState({
            isQuizOpen: false
        })
    }

    render() {
        const { farm, turn, name } = this.props
        const { isDiceOpen, formData, isQuizOpen } = this.state

        return (
            <div className="player-canvas" style={{ pointerEvents: turn ? 'auto' : 'none' }}>

                <div className="mb-3">
                    <div className="row">
                        <div className="col">
                            <h2 className="player-name">Your name is {name}</h2>
                        </div>

                        <div className="col-auto">
                            <button className="btn btn-outline-primary btn-sm" disabled={!turn}
                                    onClick={this.openDice}>Throw Dice
                            </button>
                        </div>

                        <div className="col-auto">
                            <button className="btn btn-primary btn-sm" disabled={!turn}
                                    onClick={this.openQuizBonus}>Get Bonus
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="row align-items-center">
                        <div className="col">
                            Change {get(formData, 'from.name', '-')} to {get(formData, 'to.name', '-')}
                            <button onClick={this.resetChosenAnimals} className="ml-2">x</button>
                        </div>

                        <div className="col-auto">
                            <div className="input-group input-group-sm">
                                <div className="input-group-prepend" id="button-addon3">
                                    <button className="btn btn-outline-secondary" type="button"
                                            onClick={this.decrement}>-
                                    </button>
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Count"
                                    onChange={({ target: { value } }) => this.updateFormData('count', value)}
                                    value={formData['count']}
                                />

                                <div className="input-group-append" id="button-addon4">
                                    <button className="btn btn-outline-secondary" type="button"
                                            onClick={this.increment}>+
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="col-auto">
                            <button className="btn btn-outline-primary btn-sm ml-2" disabled={!turn}
                                    onClick={this.exchangeAnimals}>Exchange
                            </button>
                        </div>
                    </div>
                </div>

                <FarmGrid farm={farm} onSelect={this.selectAnimal}/>

                <BaseModal isOpen={isDiceOpen} closeModal={this.closeDice}>
                    <DiceRoll onClose={this.closeDice} gameId={this.gameId}/>
                </BaseModal>

                <BaseModal isOpen={isQuizOpen} closeModal={this.closeQuizBonus}>
                    <QuizBonus onClose={this.closeQuizBonus}/>
                </BaseModal>
            </div>
        )
    }
}

export default compose(withRouter, MarketExchangeMixin)(PlayerCanvas)
