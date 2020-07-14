import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'

class QuizBonus extends Component {
    static contextType = NotificationContext

    state = {
        quiz: {},
        answers: [],
        isCorrect: false
    }

    get gameId() {
        const { match: { params: { gameId } } } = this.props
        return gameId
    }

    componentDidMount() {
        this.getQuiz().then(data => {
            const answers = data.list.map(() => '')
            this.setState({
                quiz: data,
                answers
            })
        })
    }

    async getQuiz() {
        try {
            return (await api.get('/quiz')).data
        } catch (err) {
            console.log(err)
        }
    }

    changeAnswer(key, value) {
        this.setState(({ answers }) => {
            const newAnswers = answers.slice()
            newAnswers[key] = value

            return {
                answers: newAnswers
            }
        })
    }

    checkQuiz = async () => {
        const { answers } = this.state

        try {
            await api.post(`/quiz/${this.gameId}`, { answers })
        } catch ({ response }) {
            this.context.show({
                content: response.data,
                type: 'danger'
            })
        } finally {
            this.props.onClose()
        }
    }

    render() {
        const { name, list } = this.state.quiz

        return (
            <div className="quiz-bonus">
                <h2 className="quiz-bonus-title">{name}</h2>

                <ul className="list-group mb-3">
                    {
                        list && list.map((item, key) => (
                            <li key={key} className="list-group-item" aria-disabled="true">
                                <div className="row align-items-center">
                                    <div className="col">
                                        {item.question}
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control" value={this.state.answers[key]}
                                               onChange={({ target: { value } }) => this.changeAnswer(key, value)}/>
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
}

export default withRouter(QuizBonus)
