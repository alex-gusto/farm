const AbstractController = require('./Abstract.controller')
const QuizService = require('@/services/Quiz.service')
const GameRepository = require('@/GameRepository')

const quiz = new QuizService()

class QuizController extends AbstractController {
  get = async (ctx) => {
    const { gameId } = ctx.params
    const game = GameRepository.getGame(gameId)
    const userId = ctx.cookies.get('user_id')

    const user = game.getPlayer(userId)
    user.isAnimalEnough(0, 1)

    ctx.body = quiz.getQuiz()
  }

  check = async (ctx) => {
    const { gameId } = ctx.params
    const userId = ctx.cookies.get('user_id')
    const game = GameRepository.getGame(gameId)
    const user = game.getPlayer(userId)

    const { answers, id } = ctx.request.body
    if (quiz.checkQuiz(id, answers)) {
      user.updateAnimalCount(2, 1)
      ctx.body = {
        success: true
      }
    } else {
      user.updateAnimalCount(0, -1)
      ctx.body = {
        message: 'Wrong answers. Try again later!',
        success: false
      }
    }

    ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
  }
}

module.exports = QuizController
