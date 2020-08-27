const shuffle = require('lodash/shuffle')
const QuizzesModel = require('@/models/Quiz.model')
const EventEmitter = require('events')

class QuizService extends EventEmitter {
  #model = null

  constructor () {
    super()
    this.#model = new QuizzesModel()
  }

  getQuiz () {
    const quiz = this.#model.getRandomQuiz()
    const list = shuffle(Object.keys(quiz.list)).slice(0, 1)

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

    const errors = Object.entries(answers).reduce((acc, [ question, answer ]) => {
      const _answers = quiz.list[ question ].split(';')
      const isCorrect = _answers.some(a => a.toLocaleLowerCase() === answer.trim().toLocaleLowerCase())

      if (!isCorrect) {
        acc[ question ] = quiz.list[ question ]
      }

      return acc
    }, {})

    if (Object.keys(errors).length) {
      this.emit('fail', errors)
    } else {
      this.emit('success')
    }
  }
}

module.exports = QuizService
