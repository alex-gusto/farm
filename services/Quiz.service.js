const AnimalsModel = require('@/models/Animals.model')
const QuizzesModel = require('@/models/Quiz.model')
const shuffle = require('lodash/shuffle')
const CubicEntity = require('@/entities/Cubic.entity')
const cubicConfig = require('@/database/quiz-cubic')

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

    const isValid = Object.entries(answers).every(([ question, answer ]) => {
      const _answers = quiz.list[ question ].split(';')
      return _answers.some(a => a.toLocaleLowerCase() === answer.trim().toLocaleLowerCase())
    })

    if (isValid) {
      return this.quizSuccess()
    }
    return this.quizFail()
  }

  quizFail () {
    if (this.#player.farm[ 0 ] > 1) {
      this.#player.updateAnimalCount(0, -1)
    }

    throw new Error('Wrong answers. Try again later!')
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
