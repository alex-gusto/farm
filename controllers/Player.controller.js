const GameRepository = require('@/GameRepository')
const AbstractController = require('./Abstract.controller')


class PlayerController extends AbstractController {
    getPlayer = (ctx) => {
        const { gameId, userId } = ctx.params
        const game = GameRepository.getGame(gameId)

        ctx.body = game.getPlayer(userId)
    }

    getPlayers = (ctx) => {
        const { gameId } = ctx.params
        const game = GameRepository.getGame(gameId)

        ctx.body = { players: game.getPlayers }
    }
}

module.exports = PlayerController
