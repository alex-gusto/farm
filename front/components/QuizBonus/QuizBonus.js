import React, { Component, Fragment } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'
import BaseButton from 'base/BaseButton'
import FarmAnimal from '~/front/components/FarmAnimal'

class QuizBonus extends Component {
    static contextType = NotificationContext
    #timer = null

    state = {
        quiz: {
            list: []
        },
        answers: {},
        message: null,
        bonusAnimals: null,
        time: 75
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

            this.runTimer()
        }).catch(({ response }) => {
            this.setState({
                message: response.data
            })
        })
    }

    async getQuiz() {
        return (await api.get(`/quiz/${this.gameId}`)).data
    }

    runTimer() {
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

    destroyTimer() {
        clearInterval(this.#timer)
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
        this.destroyTimer()
        if (e) e.preventDefault()

        const { answers, quiz: { id } } = this.state

        try {
            const { data } = await api.post(`/quiz/${this.gameId}`, { answers, id })
            this.setBonusAnimal(data)
        } catch ({ response }) {
            this.setState({
                message: response.data
            })
        } finally {
            setTimeout(this.props.onClose, 1500)
        }
    }

    setBonusAnimal(animals) {
        this.setState({
            bonusAnimals: animals
        })
    }

    render() {
        const { quiz: { name, list }, message, bonusAnimals, time } = this.state

        const content = () => {
            if (message) {
                return (
                    <div className="quiz-bonus-fail">
                        <h3 className="quiz-bonus-title mb-3">{message}</h3>
                        <BaseButton theme="secondary" color="orange" onClick={this.props.onClose}>OK</BaseButton>
                    </div>
                )
            }

            if (bonusAnimals) {
                return (
                    <div>
                        <h2 className="quiz-bonus-title">{`You've got ${bonusAnimals.map(animal => animal.name).join(', ')}!`}</h2>
                        {bonusAnimals.map((animal, key) => <FarmAnimal isNameHidden={true}
                                                                       className="quiz-bonus-animal"
                                                                       key={key} {...animal} />)}
                    </div>
                )
            }

            return (
                <form className="quiz-bonus-form" onSubmit={this.checkQuiz}>
                    <h2 className="quiz-bonus-title">{name} <span className="quiz-bonus-time">Time: <br/> {time}</span>
                    </h2>
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

                    <div theme="secondary" className="text-center">
                        <BaseButton type="submit">Check</BaseButton>
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

export default withRouter(QuizBonus)
