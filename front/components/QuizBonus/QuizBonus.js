import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'
import BaseButton from 'base/BaseButton'

class QuizBonus extends Component {
    static contextType = NotificationContext

    state = {
        quiz: {},
        answers: {},
        message: ''
    }

    get gameId() {
        const { match: { params: { gameId } } } = this.props
        return gameId
    }

    componentDidMount() {
        this.getQuiz().then(data => {
            const answers = data.list.reduce((acc, key) => {
                acc[key] = ''
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

    async getQuiz() {
        return await (await api.get(`/quiz/${this.gameId}`)).data
    }

    changeAnswer(question, value) {
        this.setState(({ answers }) => {
            answers[question] = value

            return {
                answers: answers
            }
        })
    }

    checkQuiz = async (e) => {
        e.preventDefault()
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

    render() {
        const { quiz: { name, list }, message } = this.state

        const content = () => {
            if (!list) {
                return (
                    <div>
                        <h3>{message}</h3>
                        <button onClick={this.props.onClose} className="ml-2">x</button>
                    </div>
                )
            }

            return (
                <form onSubmit={this.checkQuiz}>
                    <ul className="list-group mb-3">
                        {
                            list.map((question, key) => (
                                <li key={key} className="list-group-item" aria-disabled="true">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            {question}
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" className="form-control"
                                                   value={this.state.answers[question]}
                                                   onChange={({ target: { value } }) => this.changeAnswer(question, value)}/>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                    <BaseButton type="submit">Check</BaseButton>
                </form>
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
