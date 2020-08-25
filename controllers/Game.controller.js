const GameRepository = require('@/GameRepository')
const GameService = require('@/services/Game.service')
const AbstractController = require('./Abstract.controller')
const { getSocket } = require('@/ws')

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

    ctx.body = {
      gameId: game.id,
      userId
    }
  }

  join = async (ctx) => {
    const { gameId } = ctx.params
    let { userId } = ctx.params
    const { name } = ctx.request.body
    const game = GameRepository.getGame(gameId)
    userId = game.addPlayer(userId, name)

    ctx.body = { gameId, userId }
    ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
  }

  leave = async (ctx) => {
    const { gameId, userId } = ctx.params
    const game = GameRepository.getGame(gameId)

    game.removePlayer(userId)

    if (!game.getPlayers.length) {
      GameRepository.deleteGame(gameId)
    }

    ctx.body = 'OK'
    ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
  }

  makeMove = async (ctx) => {
    const { gameId, userId } = ctx.params
    const game = GameRepository.getGame(gameId)

    const diceAnimals = game.makeMove(userId)

    ctx.body = { diceAnimals }
    ctx.io.in(gameId).emit('games:update', { players: game.getPlayers })
  }

  sendAnimals = async (ctx) => {
    const { gameId, userId } = ctx.params
    const game = GameRepository.getGame(gameId)

    const { id, toUserId } = ctx.request.body

    const socket = getSocket({ gameId, userId })
    if (socket) {
      socket.emit('games:attack')
    }

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
    // game.addPlayer(userId)

    const players = game.getPlayers
    ctx.body = { players }
    ctx.io.in(gameId).emit('games:update', { players })
  }
}

module.exports = GameController
