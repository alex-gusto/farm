import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'
import BaseButton from 'base/BaseButton'
import FarmAnimal from '~/front/components/FarmAnimal'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

class QuizBonus extends Component {
  static contextType = NotificationContext
  #timer = null

  state = {
    quiz: {
      list: []
    },
    answers: {},
    errors: null,
    bonusAnimals: null,
    time: 100,
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
    this.getQuiz().then(data => {
      const answers = data.list.reduce((acc, key) => {
        acc[ key ] = ''
        return acc
      }, {})

      this.setState({
        quiz: data,
        answers
      })

      this.runTimer()
    }).catch(({ response }) => {
      this.setState({
        message: response.data
      })
    })
  }

  async getQuiz () {
    return (await api.get(`/quiz`)).data
  }

  runTimer () {
    this.#timer = setInterval(() => {
      this.setState(({ time }) => {
        const newTime = time - 1

        if (newTime <= 0) {
          this.checkQuiz()
        }

        return {
          time: newTime
        }
      })
    }, 1000)
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

  checkQuiz = async (e) => {
    this.destroyTimer()
    if (e) e.preventDefault()

    const { answers, quiz: { id } } = this.state
    const { onSuccess, onError } = this.props
    this.setState({ isLoading: true })
    try {
      const { data } = await api.post(`/quiz`, { answers, id })
      onSuccess(data)
    } catch ({ response }) {
      onError()
      this.setState({ errors: response.data })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render () {
    const { onClose } = this.props
    const { quiz: { name, list }, errors, answers, time, isLoading } = this.state

    const questionsList = () => {
      const inputHolder = (question) => {
        const className = classnames([
          'form-control',
          {
            'is-invalid': errors && errors[ question ],
            'is-valid': errors && !errors[ question ]
          }
        ])

        return (
          <div className="col-auto">
            <input type="text"
                   className={className}
                   value={answers[ question ]}
                   onChange={({ target: { value } }) => this.changeAnswer(question, value)}/>

            <div className="invalid-feedback">
              {errors && errors[ question ]}
            </div>
          </div>
        )
      }

      return list.map((question, key) => (
        <li key={key} className="list-group-item" aria-disabled="true">
          <div className="row align-items-center">
            <div className="col">
              {question}
            </div>
            {inputHolder(question)}
          </div>
        </li>
      ))
    }

    const content = () => {
      // if (bonusAnimals) {
      //   return (
      //     <div>
      //       <h2 className="quiz-bonus-title">{`You've got ${bonusAnimals.map(animal => animal.name).join(', ')}!`}</h2>
      //       {bonusAnimals.map((animal, key) => <FarmAnimal isNameHidden={true}
      //                                                      className="quiz-bonus-animal"
      //                                                      key={key} {...animal} />)}
      //     </div>
      //   )
      // }

      return (
        <form className="quiz-bonus-form" onSubmit={this.checkQuiz}>
          <h2 className="quiz-bonus-title">{name} <span className="quiz-bonus-time">Time: <br/> {time}</span>
          </h2>
          <ul className="list-group mb-3">
            {
              questionsList()
            }
          </ul>

          <div className="text-center">
            <BaseButton theme="secondary"
                        color="orange"
                        type={errors ? 'button' : 'submit'}
                        onClick={errors && onClose}
                        disabled={isLoading}
                        loading={isLoading}>
              {errors ? 'OK' : 'Check'}
            </BaseButton>
          </div>
        </form>
      )
    }

    return (
      <div className="quiz-bonus">
        {
          content()
        }
      </div>
    )
  }
}

QuizBonus.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func
}

QuizBonus.defaultProps = {
  onSuccess: noop,
  onError: noop
}

export default withRouter(QuizBonus)
