import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'

class QuizBonus extends Component {
  static contextType = NotificationContext

  state = {
    quiz: {},
    answers: {},
    message: ''
  }

  get gameId () {
    const { match: { params: { gameId } } } = this.props
    return gameId
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
    }).catch(({ response }) => {
      this.setState({
        message: response.data
      })
    })
  }

  async getQuiz () {
    return await (await api.get(`/quiz/${this.gameId}`)).data
  }

  changeAnswer (question, value) {
    this.setState(({ answers }) => {
      answers[ question ] = value

      return {
        answers: answers
      }
    })
  }

  checkQuiz = async () => {
    const { answers, quiz: { id } } = this.state

    try {
      await api.post(`/quiz/${this.gameId}`, { answers, id })
    } catch ({ response }) {
      this.context.show({
        content: response.data,
        type: 'danger'
      })
    } finally {
      this.props.onClose()
    }
  }

  render () {
    const { quiz: { name, list }, message } = this.state

    const content = () => {
      if (!list) return message

      return (
        <div>
          <ul className="list-group mb-3">
            {
              list.map((question, key) => (
                <li key={key} className="list-group-item" aria-disabled="true">
                  <div className="row align-items-center">
                    <div className="col">
                      {question}
                    </div>
                    <div className="col-auto">
                      <input type="text" className="form-control" value={this.state.answers[ question ]}
                             onChange={({ target: { value } }) => this.changeAnswer(question, value)}/>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
          <button className="btn btn-secondary btn-sm" onClick={this.checkQuiz}>Check</button>
        </div>
      )
    }

    return (
      <div className="quiz-bonus">
        <h2 className="quiz-bonus-title">{name}</h2>

        {
          content()
        }

      </div>
    )
  }
}

export default withRouter(QuizBonus)
