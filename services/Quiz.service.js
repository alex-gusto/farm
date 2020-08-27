const AnimalsModel = require('@/models/Animals.model')
const QuizzesModel = require('@/models/Quiz.model')
const shuffle = require('lodash/shuffle')
const CubicEntity = require('@/entities/Cubic.entity')
const cubicConfig = require('@/database/quiz-cubic')
const FormError = require('@/utils/exceptions/FormError')

const cubic = new CubicEntity(cubicConfig)

class QuizService {
  #model = null
  #animalsModel = null
  #player = null

  constructor () {
    this.#model = new QuizzesModel()
    this.#animalsModel = new AnimalsModel()
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

    const errors = Object.entries(answers).reduce((acc, [ question, answer ]) => {
      const _answers = quiz.list[ question ].split(';')
      const isCorrect = _answers.some(a => a.toLocaleLowerCase() === answer.trim().toLocaleLowerCase())

      if(!isCorrect){
        acc[question] = quiz.list[ question ]
      }

      return acc
    }, {})

    if (!Object.keys(errors).length) {
      return this.quizSuccess()
    }

    return this.quizFail(errors)
  }

  quizFail (errors) {
    if (this.#player.farm[ 0 ] > 1) {
      this.#player.updateAnimalCount(0, -1)
    }

    throw new FormError(JSON.stringify(errors))
  }

  quizSuccess () {
    const result = cubic.throwDice()
    result.forEach(id => this.#player.updateAnimalCount(id, 1))

    return this.#animalsModel.getAnimalsByIds(result)
  }

  setPlayer (player) {
    this.#player = player
  }
}

module.exports = QuizService
