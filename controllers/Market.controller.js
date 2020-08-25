const AbstractController = require('./Abstract.controller')
const GameRepository = require('@/GameRepository')

function CustomException (message) {
  const error = new Error(message)
  error.statusCode = 304
  return error
}

CustomException.prototype = Object.create(Error.prototype)

class MarketController extends AbstractController {
  get = async (ctx) => {
    const { gameId } = ctx.params
    const game = GameRepository.getGame(gameId)

    ctx.body = game.getMarket
  }

  exchange = async (ctx) => {
    const { gameId, userId } = ctx.params
    const game = GameRepository.getGame(gameId)

    try {
      // TODO: need validation
      const { from, to, count } = ctx.request.body
      ctx.body = game.exchangeAnimals(userId, from, count, to)
      ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
    } catch (e) {
      // TODO: add status
      ctx.throw(404, e.message)
    }
  }

}

module.exports = MarketController
