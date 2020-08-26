const random = require('lodash/random')

class MarketModel {
  #quizzes = []

  constructor () {
    this.#quizzes = this._load()
  }

  get quizzes () {
    return this.#quizzes
  }

  getRandomQuiz () {
    const count = this.#quizzes.length
    const index = random(count - 1)
    const quiz = this.#quizzes[ index ]

    if (quiz.disabled) {
      return this.getRandomQuiz()
    }

    return quiz
  }

  getQuizById (id) {
    return this.#quizzes.find(quiz => quiz.id === id)
  }

  _load () {
    return require('../database/quizzes')
  }
}

module.exports = MarketModel
