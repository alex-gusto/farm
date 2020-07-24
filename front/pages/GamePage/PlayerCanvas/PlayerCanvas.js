import BaseButton from 'base/BaseButton'
import BaseIconButton from 'base/BaseIconButton'
import BaseTextField from 'base/BaseTextField'
import BaseModal from 'base/BaseModal'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import api from '~/front/api'

// Components
import DiceRoll from '~/front/components/DiceRoll'
import QuizBonus from '~/front/components/QuizBonus'
import FarmGrid from '~/front/components/FarmGrid'
import DynamicMetaData from './DynamicMetaData'

// Mixins
import MarketExchangeMixin from './MarketExchange.mixin'

// Providers
import { NotificationContext } from '~/front/providers/NotificationProvider'

// Utils
import get from 'lodash/get'
import compose from 'lodash/fp/compose'

class PlayerCanvas extends Component {
  static contextType = NotificationContext
  state = {
    isDiceOpen: false,
    isQuizOpen: false,
    quizUsed: false,
    formData: {
      from: undefined,
      to: undefined,
      count: ''
    },
    isLoading: false,
    market: {}
  }

  componentDidMount () {
    this.getMarket()
  }

  get gameId () {
    const { match: { params: { gameId } } } = this.props
    return gameId
  }

  openDice = () => {
    this.setState({
      isDiceOpen: true,
      isLoading: true
    })
  }

  closeDice = () => {
    this.setState({
      isDiceOpen: false,
      quizUsed: false,
      isLoading: false
    })
  }

  openQuizBonus = () => {
    this.setState({
      isQuizOpen: true,
      quizUsed: true
    })
  }

  closeQuizBonus = () => {
    this.setState({
      isQuizOpen: false
    })
  }

  exitGame = () => {
    api.delete(`/games/${this.gameId}`)
    this.props.history.push('/')
  }

  render () {
    const { farm, turn, name } = this.props
    const { isDiceOpen, formData, isQuizOpen, quizUsed, isLoading, market } = this.state

    return (
      <div className="player-canvas" style={{ pointerEvents: turn ? 'auto' : 'none' }}>

        {turn && <DynamicMetaData/>}

        <div className="mb-3 text-white">
          <div className="row">
            <div className="col">
              <h2 className="player-name">Your name is {name}</h2>
              <button onClick={this.exitGame}>Exit game</button>
            </div>

            <div className="col-auto">
              <BaseButton theme="secondary" color="blue" disabled={!turn || isLoading}
                          loading={isLoading}
                          onClick={this.openDice}>
                Throw Dice
              </BaseButton>
            </div>

            <div className="col-auto">
              <BaseButton theme="secondary" color="orange" disabled={!turn || quizUsed}
                          onClick={this.openQuizBonus}>Get Bonus
              </BaseButton>
            </div>
          </div>
        </div>

        <div className="mb-3 text-white">
          <div className="row align-items-center">
            {/*<div className="col-auto">*/}
            {/*<div className="input-group input-group-sm">*/}
            {/*<div className="input-group-prepend" id="button-addon3">*/}
            {/*<button className="btn btn-outline-secondary" type="button"*/}
            {/*onClick={this.decrement}>-*/}
            {/*</button>*/}
            {/*</div>*/}
            {/*<input*/}
            {/*type="number"*/}
            {/*className="form-control"*/}
            {/*placeholder="Count"*/}
            {/*onChange={({ target: { value } }) => this.updateFormData('count', value)}*/}
            {/*value={formData[ 'count' ]}*/}
            {/*/>*/}

            {/*<div className="input-group-append" id="button-addon4">*/}
            {/*<button className="btn btn-outline-secondary" type="button"*/}
            {/*onClick={this.increment}>+*/}
            {/*</button>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className="d-flex">
          <div className="col pr-5">
            <FarmGrid farm={farm} market={market} onSelect={this.selectAnimal}/>
          </div>

          <div className="col-auto">
            <div className="exchanger">
              <BaseIconButton onClick={this.resetChosenAnimals}
                              className="exchanger__cancel">x</BaseIconButton>

              <h3 className="exchanger__title">
                Exchanger
              </h3>

              <div className="exchanger__inner">
                <div className="exchanger-animal">
                  <img src={get(formData, 'from.image')} alt=""/>
                </div>
                <span>to</span>
                <div className="exchanger-animal">
                  <img src={get(formData, 'to.image')} alt=""/>
                </div>
              </div>

              <div className="exchanger__footer">
                <BaseTextField
                  type="number"
                  label="Count"
                  onChange={(value) => this.updateFormData('count', value)}
                  value={formData[ 'count' ]}
                />

                <BaseButton theme="secondary" color="blue" className="mx-auto" disabled={!turn}
                            onClick={this.exchangeAnimals}>Exchange
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        {isDiceOpen && <DiceRoll gameId={this.gameId} onClose={this.closeDice}/>}

        <BaseModal isOpen={isQuizOpen} closeModal={this.closeQuizBonus} hasClose={false}>
          <QuizBonus onClose={this.closeQuizBonus}/>
        </BaseModal>
      </div>
    )
  }
}

export default compose(withRouter, MarketExchangeMixin)(PlayerCanvas)
