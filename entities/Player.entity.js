const uniqueID = require('@/utils/unique-id')

const FARM = [0, 1, 2, 3, 4, 5, 6, 9] // HARD CODE ids

class PlayerEntity {
    #id = null
    #name = ''
    #farm = {}
    #needsToWin = {}
    #bonusPrice = 1

    exchangeOnce = 0

    constructor({ id, name, animals, defenders, needsToWin }) {
        this.#id = id || PlayerEntity.generateId(name)
        this.#name = name || 'No name'
        this.#needsToWin = needsToWin

        this._createFarm(animals)
        this._defineGetterForDogs(defenders)
    }

    get farm() {
        return this.#farm
    }

    get id() {
        return this.#id
    }

    get bonusPrice() {
        return this.#bonusPrice
    }

    get name() {
        return this.#name
    }

    get isWinner() {
        return Object.entries(this.#needsToWin).every(([id, count]) => this.farm[id] >= count)
    }

    static generateId(name) {
        if (name) {
            return name.toLocaleLowerCase().replace(/\s+/gi, '-')
        }

        return uniqueID()
    }

    _createFarm(animals) {
        this.#farm = animals.reduce((acc, animal) => {
            // TODO: make it dynamic
            if (!FARM.includes(animal.id)) return acc

            acc[animal.id] = 0
            return acc
        }, {})
    }

    _defineGetterForDogs(dogs) {
        dogs.forEach(dog => Object.defineProperty(this, `has${dog.id}`, {
            get() {
                return !!this.farm[dog.id]
            }
        }))
    }

    _hasResident = (id) => {
        if (!this.farm.hasOwnProperty(id)) {
            throw new Error(`No animal with animalId ${id} found`)
        }
    }

    breedAnimals(id, bonus = 0) {
        this._hasResident(id)
        const farm = this.farm

        farm[id] = farm[id] + bonus

        const progeny = Math.floor(farm[id] / 2) // every couple give on child

        farm[id] = farm[id] + progeny
    }

    updateAnimalCount(id, increment = 0) {
        this._hasResident(id)
        const farm = this.farm

        farm[id] = farm[id] + increment
    }

    eatAnimals(id) {
        const farm = this.farm
        this._hasResident(id)

        farm[id] = 0
    }

    isAnimalEnough(id, count) {
        this._hasResident(id)

        if (this.farm[id] < count) {
            throw new Error(`Not enough animal with animalId ${id} found`)
        }
    }

    exchangeAnimals(from, fromCount, to, toCount) {
        [from, to].every(this._hasResident)

        this.exchangeOnce = 1

        this.farm[from] -= fromCount
        this.farm[to] += toCount

        return this.farm
    }

    incrementBonusPrice() {
        this.#bonusPrice += 1
    }

    resetBonusPrice() {
        this.#bonusPrice = 1
    }
}

module.exports = PlayerEntity
