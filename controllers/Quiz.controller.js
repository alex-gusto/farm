const AbstractController = require('./Abstract.controller')
const QuizService = require('@/services/Quiz.service')

const quiz = new QuizService()

class QuizController extends AbstractController {
  get = async (ctx) => {
    ctx.body = quiz.getQuiz()
  }

  check = async (ctx) => {
    const { answers, id } = ctx.request.body

    quiz.once('success', () => {
      ctx.body = 'OK'
    })

    quiz.once('fail', (errors) => {
      ctx.status = 422
      ctx.body = JSON.stringify(errors)
    })

    quiz.checkQuiz(id, answers)
  }
}

module.exports = QuizController
