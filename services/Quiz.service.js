const QuizzesModel = require('@/models/Quiz.model')
const shuffle = require('lodash/shuffle')

class QuizService {
  #model = null

  constructor () {
    this.#model = new QuizzesModel()
  }

  getQuiz () {
    const quiz = this.#model.getRandomQuiz()
    const list = shuffle(Object.keys(quiz.list)).slice(0, 4)

    return {
      ...quiz,
      list
    }
  }

  checkQuiz (id, answers) {
    const quiz = this.#model.getQuizById(id)

    if (!quiz) {
      throw new Error('Quiz not found!')
    }

    return Object.entries(answers).every(([ question, answer ]) => {
      return quiz.list[ question ].toLocaleLowerCase() === answer.trim().toLocaleLowerCase()
    })
  }
}

module.exports = QuizService
