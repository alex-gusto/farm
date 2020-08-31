import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'
import BaseButton from 'base/BaseButton'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

class QuizBlock extends Component {
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
    this.getQuiz()
  }

  componentWillUnmount () {
    this.destroyTimer()
  }

  async getQuiz () {
    const { getUrl } = this.props
    try {
      const { data } = await api.get(getUrl)
      const answers = data.list.reduce((acc, key) => {
        acc[ key ] = ''
        return acc
      }, {})

      this.setState({ quiz: data, answers })
      this.runTimer()
    } catch ({ response }) {
      console.log(response.data)
    }
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

    this.setState({ isLoading: true })
    const { answers, quiz: { id } } = this.state
    const { onSuccess, onError, postUrl } = this.props

    try {
      const { data } = await api.post(postUrl, { answers, id })
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
      return (
        <form className="quiz-block-form" onSubmit={this.checkQuiz}>
          <h2 className="quiz-block-title">{name} <span className="quiz-block-time">Time: <br/> {time}</span>
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
      <div className="quiz-block">
        {
          content()
        }
      </div>
    )
  }
}

QuizBlock.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  getUrl: PropTypes.string,
  postUrl: PropTypes.string
}

QuizBlock.defaultProps = {
  onSuccess: noop,
  onError: noop,
  getUrl: '/quiz',
  postUrl: '/quiz'
}

export default withRouter(QuizBlock)
