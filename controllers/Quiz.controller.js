const AbstractController = require('./Abstract.controller')
const QuizService = require('@/services/Quiz.service')
const GameRepository = require('@/GameRepository')

const quiz = new QuizService()

class QuizController extends AbstractController {
    get = async (ctx) => {
        ctx.body = quiz.getQuiz()
    }

    check = async (ctx) => {
        const { gameId } = ctx.params
        const userId = ctx.cookies.get('user_id')
        const { answers, id } = ctx.request.body
        const game = GameRepository.getGame(gameId)

        quiz.checkQuiz(game, userId, id, answers)

        ctx.body = 'OK'

        ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
    }
}

module.exports = QuizController
