const AbstractController = require('./Abstract.controller')
const QuizService = require('@/services/Quiz.service')
const GameRepository = require('@/GameRepository')

const quiz = new QuizService()

class QuizController extends AbstractController {
    get = async (ctx) => {
        const { gameId, userId } = ctx.params
        const game = GameRepository.getGame(gameId)

        const user = game.getPlayer(userId)
        user.isAnimalEnough(0, 1)

        ctx.body = quiz.getQuiz()
    }

    check = async (ctx) => {
        const { gameId, userId } = ctx.params
        const game = GameRepository.getGame(gameId)
        quiz.setPlayer(game.getPlayer(userId))

        const { answers, id } = ctx.request.body
        try {
            ctx.body = quiz.checkQuiz(id, answers)
        } catch (e) {
            ctx.status = 422
            ctx.body = e.message
        } finally {
            ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
        }

    }
}

module.exports = QuizController
