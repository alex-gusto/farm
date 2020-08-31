const PlayerEntity = require('../entities/Player.entity')
const PlayerQueue = require('../utils/PlayerQueue')
const AnimalsModel = require('@/models/Animals.model')
const MarketEntity = require('@/entities/Market.entity')
const CubicEntity = require('@/entities/Cubic.entity')
const gameCubicConfig = require('@/database/game-cubic')
const quizCubicConfig = require('@/database/quiz-cubic')
const uniqueID = require('@/utils/unique-id')
const { getSocket } = require('@/ws')

const QuizService = require('@/services/Quiz.service')

const quiz = new QuizService()
const quizCubic = new CubicEntity(quizCubicConfig)
const gameCubic = new CubicEntity(gameCubicConfig)

class GameService {
  static needsToWin = {
    '0': 2,
    '1': 2,
    '2': 1,
    '3': 1,
    '4': 1
  }

  #id = null
  #market = null
  #playersQueue = null

  constructor (id = uniqueID()) {
    this.#id = id
    this.animalsModel = new AnimalsModel()
    this.#market = new MarketEntity(5, this.animalsModel.getDogs)
    this.#playersQueue = new PlayerQueue()
  }

  get id () {
    return this.#id
  }

  get getPlayers () {
    return this.#playersQueue.players.map((player) => {
      const animals = this.animalsModel.getAnimalsByIds(Object.keys(player.farm))
      const farm = animals.map(animal => {
        return {
          total: player.farm[ animal.id ],
          ...animal
        }
      })

      return {
        id: player.id,
        name: player.name,
        farm,
        isWinner: player.isWinner,
        turn: player.id === this.#playersQueue.currentPlayerId
      }
    })
  }

  get getMarket () {
    return this.#market.marketList
  }

  getPlayer (id) {
    return this.#playersQueue.getPlayer(id)
  }

  addPlayer (id, name) {
    console.log('add player', { id, name })
    const defenders = this.animalsModel.getDogs
    const animals = this.animalsModel.getAnimals
    let player = this.getPlayer(id)

    if (!player) {
      player = new PlayerEntity({ id, name, animals, defenders, needsToWin: GameService.needsToWin })
      // HARD CODE
      player.updateAnimalCount(0, 1) // set one duck on init
      this.#playersQueue.addPlayer(player.id, player)
    }

    return player.id
  }

  removePlayer (id) {
    this.#playersQueue.deletePlayer(id)
  }

  nextTurn () {
    this.#playersQueue.nextPlayer()
  }

  makeMove (userId) {
    this.#playersQueue.checkPlayerTurn(userId)
    const player = this.getPlayer(userId)

    const diceAnimals = gameCubic.throwDice()

    const [ a, b ] = diceAnimals
    const bonus = a === b ? 1 : 0

    if (bonus) {
      this.breedAnimals(player, a, 1)
    } else {
      diceAnimals.forEach(id => {
        this.checkPredators(player, id)
        this.breedAnimals(player, id)
      })
    }

    this.nextTurn()
    player.exchangeOnce = 0

    return this.animalsModel.getAnimalsByIds(diceAnimals)
  }

  sendAnimals ({ gameId, userId, toUserId, animalId, count }) {
    const player = this.getPlayer(userId)
    const playerTo = this.getPlayer(toUserId)

    // FIXME: need refactor
    player.isAnimalEnough(animalId, count)

    const socketTo = getSocket({ gameId, userId: toUserId })
    const defence = ({ type, id, count, success }) => {
      if (type === 'animal') {
        playerTo.isAnimalEnough(id, count)
        playerTo.updateAnimalCount(id, -count)
        return true
      }

      return type === 'quiz' && success
    }

    return new Promise(resolve => {
      if (socketTo) {
        socketTo.emit(
          'games:attack',
          {
            name: player.name
          },
          (...args) => {
            player.updateAnimalCount(animalId, -count)

            if (!defence(...args)) {
              this.checkPredators(playerTo, animalId)
            }

            resolve()
          }
        )
      }
    })
  }

  // TODO: set active player
  checkPredators (player, id) {
    const predators = this.animalsModel.getPredators
    const predator = predators.find(predator => predator.id === id)
    if (!predator) return

    if (player[ `has${predator.against}` ]) {
      player.eatAnimals(predator.against)
    } else {
      this.eatAnimals(player, predator.eats)
    }
  }

  breedAnimals (player, id, bonus = 0) {
    const nativeAnimals = this.animalsModel.getNativeAnimals

    if (nativeAnimals.some(animal => animal.id === id)) {
      player.breedAnimals(id, bonus)
    }
  }

  eatAnimals (player, ids) {
    ids.forEach(id => player.eatAnimals(id))

    // HARD CODE
    if (!player.farm[ 0 ]) {
      player.breedAnimals(0, 1) // set one duck
    }
  }

  checkDogs (player, id, count) {
    const dogs = this.animalsModel.getDogs

    if (player[ `has${id}` ]) {
      throw new Error('Dog is already taken')
    }

    if (dogs.some(dog => dog.id === id) && count > 1) {
      throw new Error('Dogs count can\'t be grater than 1')
    }
  }

  exchangeAnimals (userId, from, fromCount, to) {
    this.#playersQueue.checkPlayerTurn(userId)
    const player = this.getPlayer(userId)
    player.isWinner

    if (player.exchangeOnce) {
      throw new Error('You have already used market!')
    }

    player.isAnimalEnough(from, fromCount)
    this.checkDogs(player, to, fromCount)

    const result = this.#market.exchangeAnimals(from, fromCount, to)
    return player.exchangeAnimals(from, fromCount - result.rest, to, result.toCount)
  }

  onQuizSuccess (userId, resolve) {
    const player = this.getPlayer(userId)
    const result = quizCubic.throwDice()
    result.forEach(id => player.updateAnimalCount(id, 1))

    const animals = this.animalsModel.getAnimalsByIds(result)
    resolve(animals)
  }

  onQuizFail (userId) {
    const player = this.getPlayer(userId)
    if (player.farm[ 0 ] > 1) {
      player.updateAnimalCount(0, -1)
    }
  }

  getQuiz () {
    return quiz.getQuiz()
  }

  checkQuiz ({ answers, id, userId }) {
    return new Promise((resolve, reject) => {
      quiz.once('success', () => this.onQuizSuccess(userId, resolve))
      quiz.once('fail', (errors) => {
        this.onQuizFail(userId)
        reject(errors)
      })

      quiz.checkQuiz(id, answers)
    })
  }
}

module.exports = GameService
