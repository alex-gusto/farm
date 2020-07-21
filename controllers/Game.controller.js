const GameRepository = require('@/GameRepository')
const GameService = require('@/services/Game.service')
const AbstractController = require('./Abstract.controller')

// test game
const game = new GameService('1')
game.addPlayer('1')
game.addPlayer('2')

GameRepository.setGame(game.id, game)

class GameController extends AbstractController {
  create = async (ctx) => {
    const game = new GameService()
    const { name } = ctx.request.body
    const userId = game.addPlayer(undefined, name)

    GameRepository.setGame(game.id, game)
    ctx.cookies.set('user_id', userId, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: false
    })
    ctx.body = {
      gameId: game.id,
      userId
    }
    const socket = this.getSocket(ctx)
    if (socket) {
      socket.join(game.id, () => console.log('joined room: ', game.id))
    }
  }

  join = async (ctx) => {
    const { gameId } = ctx.params
    const { name } = ctx.request.body
    let userId = ctx.cookies.get('user_id')
    const game = GameRepository.getGame(gameId)
    userId = game.addPlayer(userId, name)

    ctx.cookies.set('user_id', userId, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: false
    })
    ctx.body = { gameId, userId }

    const socket = this.getSocket(ctx)
    if (socket) {
      socket.join(game.id, () => console.log('join', userId))
      socket.in(game.id).emit('games:join', { players: game.getPlayers })
    }
  }

  makeMove = async (ctx) => {
    const { gameId } = ctx.params
    const userId = ctx.cookies.get('user_id')
    const game = GameRepository.getGame(gameId)

    const diceAnimals = game.makeMove(userId)
    ctx.body = { diceAnimals }

    this.checkSocketRoom(ctx)
    ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
  }

  sendAnimals = async (ctx) => {
    const { gameId } = ctx.params
    const userId = ctx.cookies.get('user_id')
    const game = GameRepository.getGame(gameId)

    const { id, toUserId } = ctx.request.body

    ctx.body = game.sendAnimals(userId, toUserId, +id)
    ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
  }

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

module.exports = GameController
