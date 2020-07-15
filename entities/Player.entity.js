class PlayerEntity {
    #id = null
    #name = ''
    #farm = {}

    exchangeOnce = 0

    constructor(id, name = 'No name', nativeAnimals, dogs) {
        this.#id = id
        this.#name = name

        this._createFarm([...nativeAnimals, ...dogs])
        this._defineGetterForDogs(dogs)
    }

    get farm() {
        return this.#farm
    }

    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }

    get isWinner() {
        return Object.values(this.farm).every(animal => animal)
    }

    _createFarm(animals) {
        this.#farm = animals.reduce((acc, animal) => {
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
        const farm = this.farm
        this._hasResident(id)

        farm[id] = farm[id] + bonus

        const progeny = Math.floor(farm[id] / 2) // every couple give on child

        farm[id] = farm[id] + progeny
    }

    updateAnimalCount(id, increment = 0) {
        const farm = this.farm
        this._hasResident(id)

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

        this.exchangeOnce = 1;

        this.farm[from] -= fromCount
        this.farm[to] += toCount


        return this.farm
    }
}


module.exports = PlayerEntity
