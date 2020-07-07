const { v4: uuid } = require('uuid')
const PlayerEntity = require('../entities/Player.entity')
const AnimalsModel = require('@/models/Animals.model')
const MarketEntity = require('@/entities/Market.entity')
const CubicEntity = require('@/entities/Cubic.entity')

const cubic = new CubicEntity()

class GameService {
    #players = []
    #id = null
    #turn = 0
    #market = null

    constructor(id = uuid()) {
        this.#id = id
        this.animalsModel = new AnimalsModel()
        this.#market = new MarketEntity(5, this.animalsModel.getDogs)
    }

    get id() {
        return this.#id
    }

    get getPlayers() {
        return this.#players.map((player, i) => {
            const animals = this.animalsModel.getAnimals
            const farm = animals.reduce((acc, animal) => {
                const { id } = animal

                if (id in player.farm) {
                    acc.push({
                        total: player.farm[id],
                        ...animal
                    })
                }

                return acc
            }, [])

            return {
                id: player.id,
                name: player.name,
                farm,
                turn: i === this.#turn
            }
        })
    }

    get getPlayer() {
        return (id) => {
            const player = this.#players.find(player => player.id === id)

            // TODO: check exception
            // if (!player) throw new Error('No player found!')

            return player
        }
    }

    get getMarket() {
        return this.#market.marketList
    }

    addPlayer(id = uuid(), name) {
        console.log('user ', id)
        const dogs = this.animalsModel.getDogs
        const nativeAnimals = this.animalsModel.getNativeAnimals
        const player = this.getPlayer(id)

        if (!player) {
            const player = new PlayerEntity(id, name, nativeAnimals, dogs)
            // HARD CODE
            player.breedAnimals(0, 1) // set one duck on init
            this.#players.push(player)
        }

        return id
    }

    nextTurn() {
        let turn = this.#turn
        turn++

        if (turn >= this.#players.length) {
            turn = 0
        }

        this.#turn = turn
    }

    makeMove(userId) {
        const player = this.getPlayer(userId)

        const diceAnimals = cubic.throwDice()
        const predatorAnimals = this.animalsModel.getPredators


        const [a, b] = diceAnimals
        const bonus = a === b ? 1 : 0

        if (bonus) {
            this.breedAnimals(player, a, 1)
        } else {
            diceAnimals.forEach(id => {
                this.checkPredators(player, predatorAnimals, id)
                this.breedAnimals(player, id)
            })
        }

        if (player.isWinner) {
            throw new Error('You are win!')
        }

        this.nextTurn()
        player.exchangeOnce = 0

        return this.animalsModel.getAnimalsByIds(diceAnimals)
    }

    // TODO: set active player
    checkPredators(player, predators, id) {
        const predator = predators.find(predator => predator.id === id)
        if (predator) {
            if (player[`has${predator.against}`]) {
                player.eatAnimals(predator.against)
            } else {
                this.eatAnimals(player, predator.eats)
            }
        }
    }

    breedAnimals(player, id, bonus = 0) {
        const nativeAnimals = this.animalsModel.getNativeAnimals

        if (nativeAnimals.some(animal => animal.id === id)) {
            player.breedAnimals(id, bonus)
        }
    }

    eatAnimals(player, ids) {
        ids.forEach(id => player.eatAnimals(id))

        // HARD CODE
        if (!player.farm[0]) {
            player.breedAnimals(0, 1) // set one duck
        }
    }

    checkDogs(player, id, count) {
        const dogs = this.animalsModel.getDogs

        if (player[`has${id}`]) {
            throw new Error('Dog is already taken')
        }

        if (dogs.some(dog => dog.id === id) && count > 1) {
            throw new Error('Dogs count can\'t be grater than 1')
        }
    }

    exchangeAnimals(userId, from, fromCount, to) {
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
}

module.exports = GameService
