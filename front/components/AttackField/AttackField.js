import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'
import BaseButton from 'base/BaseButton'
import FarmAnimal from '~/front/components/FarmAnimal'
import QuizBonus from '@/components/QuizBonus'

class AttackField extends Component {
  static contextType = NotificationContext
  #timer = null

  state = {
    isQuizOpen: false,
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

  defenceByQuiz = () => {
    // const { onClose, next } = this.props
    this.setState({ isQuizOpen: true })
    // next({ type: 'quiz' })
    // onClose()
  }

  // TODO: refactor attack/defence logic
  defenceByTiger = () => {
    const { onClose, next } = this.props

    next({ type: 'animal', id: 9, count: 1 })
    onClose()
  }

  render () {
    const { isQuizOpen, isLoading, message } = this.state
    const { farm, name: userName, onClose } = this.props

    const tiger = farm.find(animal => animal.id === 9)

    const content = () => {
      if (message) {
        return (
          <div className="quiz-bonus-fail">
            <h3 className="quiz-bonus-title mb-3">{message}</h3>
            <BaseButton theme="secondary" color="orange" onClick={onClose}>OK</BaseButton>
          </div>
        )
      }

      if (isQuizOpen) {
        return (
          <QuizBonus onClose={onClose}/>
        )
      }

      if (tiger.total) {
        return (
          <div className="quiz-bonus-fail">
            <h2 className="attack-field-title">{userName} is attack you!</h2>
            <h3 className="quiz-bonus-title mb-3">You have no tigers.</h3>
          </div>
        )
      }

      return (
        <div>
          <h2 className="attack-field-title">{userName} is attack you! Defence by: </h2>
          <div className="attack-field-defend">
            {
              tiger.total ? <FarmAnimal isNameHidden={true}
                                        onClick={this.defenceByTiger}
                                        className="attack-field-animal" {...tiger} /> : ''
            }
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
