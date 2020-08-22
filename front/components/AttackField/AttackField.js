import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'
import BaseButton from 'base/BaseButton'
import FarmAnimal from '~/front/components/FarmAnimal'

class AttackField extends Component {
  static contextType = NotificationContext
  #timer = null

  state = {
    quiz: {
      list: []
    },
    answers: {},
    message: null,
    bonusAnimals: null,
    time: 120,
    isLoading: false
  }

  get gameId () {
    const { match: { params: { gameId } } } = this.props
    return gameId
  }

  get userId () {
    const { match: { params: { userId } } } = this.props
    return userId
  }

  componentDidMount () {

  }

  async getQuiz () {
    return (await api.get(`/quiz/${this.gameId}/${this.userId}`)).data
  }

  runTimer () {

  }

  destroyTimer () {
    clearInterval(this.#timer)
  }

  changeAnswer (question, value) {
    this.setState(({ answers }) => {
      answers[ question ] = value

      return {
        answers: answers
      }
    })
  }

  defenceByQuiz = () => {

  }

  defenceByTiger () {

  }

  render () {
    const { quiz: { list }, message, bonusAnimals, time, isLoading } = this.state
    const { farm, name: userName } = this.props

    const tiger = farm.find(animal => animal.id === 9)

    const content = () => {
      if (message) {
        return (
          <div className="quiz-bonus-fail">
            <h3 className="quiz-bonus-title mb-3">{message}</h3>
            <BaseButton theme="secondary" color="orange" onClick={this.props.onClose}>OK</BaseButton>
          </div>
        )
      }

      return (
        <div>
          <h2 className="attack-field-title">{userName} is attack you! Defence by: </h2>
          <div className="attack-field-defend">
            {tiger && tiger.total && <FarmAnimal isNameHidden={true}
                                                 onClick={this.defenceByTiger}
                                                 className="attack-field-animal" {...tiger} />}
            {/*<BaseButton*/}
            {/*color="orange"*/}
            {/*onClick={this.defenceByQuiz}*/}
            {/*disabled={isLoading}*/}
            {/*loading={isLoading}>*/}
            {/*Quiz*/}
            {/*</BaseButton>*/}
          </div>
        </div>
      )
    }

    return (
      <div className="attack-field">
        {
          content()
        }
      </div>
    )
  }
}

export default withRouter(AttackField)
