const isNumber = require('lodash/isNumber')
const MarketModel = require('../models/Market.model')

class MarketEntity {
    #dogs = {}

    constructor(playersCount, dogs) {
        this.#dogs = this._initDogs(dogs, playersCount)

        this.model = new MarketModel()
    }

    get marketList() {
        return this.model.market
    }

    _initDogs(dogs, playersCount) {
        return dogs.reduce((acc, dog) => {
            acc[dog.id] = Math.floor(dog.count * playersCount) || 1
            return acc
        }, {})
    }

    _decrementDog(id) {
        this.#dogs[id]--
    }

    _incrementDog(id) {
        this.#dogs[id]++
    }

    _checkDogRemains(type) {
        if (!this.#dogs.hasOwnProperty(type)) return true

        return this.#dogs[type] > 0
    }

    getExchanger(animalId) {
        return this.model.market.find(ex => ex.animalId == animalId)
    }

    getCoef(exchanger, animalIdToEx) {
        const exchange = exchanger.exchangeList.find(animal => animal.id == animalIdToEx)
        if (!exchange) {
            throw new Error('No exchange found!')
        }

        const coef = exchange.coef.split('/') // for 1/6 number
        return coef.length > 1 ? coef[0] / coef[1] : coef[0]
    }

    exchangeAnimals(from, fromCount, to) {
        if (!this._checkDogRemains(to)) {
            throw new Error('No DOGs!')
        }

        const exchanger = this.getExchanger(from)
        const coef = this.getCoef(exchanger, to)
        const result = fromCount / coef
        const toCount = Math.floor(result)
        const rest = (result - toCount) * coef

        return { toCount, rest }
    }
}

module.exports = MarketEntity;
