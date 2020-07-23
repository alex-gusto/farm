const CustomException = require('@/utils/CustomException')

const games = new Map()

const GameRepository = {
  getGame (id) {
    const game = games.get(id)

    if (!game) throw new CustomException('Game not found!', 404)

    return game
  },

  setGame (id, game) {
    games.set(id, game)
  },

  deleteGame (id) {
    games.delete(id)
  }
}

module.exports = GameRepository

