const AbstractController = require('./Abstract.controller')
const QuizService = require('@/services/Quiz.service')

const quiz = new QuizService()

class QuizController extends AbstractController {
  get = async (ctx) => {
    ctx.body = quiz.getQuiz()
  }

  check = async (ctx) => {
    const { answers, id } = ctx.request.body

    function onQuizSuccess () {
      quiz.off('fail', onQuizFail)
      ctx.body = 'OK'
    }

    function onQuizFail (errors) {
      quiz.off('success', onQuizSuccess)
      ctx.status = 422
      ctx.body = JSON.stringify(errors)
    }

    quiz.once('success', onQuizSuccess)
    quiz.once('fail', onQuizFail)

    quiz.checkQuiz(id, answers)
  }
}

module.exports = QuizController
