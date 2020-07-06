const priv = new Map()
const cloneDeep = require('../utils/clone-deep')

const toMap = (arr, key = 'id') => {
    return arr.reduce((acc, item) => acc.set(item[key], item), new Map())
}

class MarketModel {
    #market = []

    constructor() {
        this.#market = this._load()
    }

    get market() {
        return this.#market
    }

    _load() {
        const market = require('../database/market')
        const animals = require('../database/animals')
        const animalsMap = toMap(animals)

        return market.map(item => {
            item.animal = animalsMap.get(item.animalId)
            item.exchangeList.forEach(k => {
                k.animal = animalsMap.get(k.id)
            })

            return item
        })
    }
}

module.exports = MarketModel
