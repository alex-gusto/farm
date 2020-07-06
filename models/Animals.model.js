const priv = new Map()
const cloneDeep = require('../utils/clone-deep')
const TYPES = require('../config/animal-types')

class AnimalsModel {
    #animals = []

    constructor() {
        this.#animals = this._load()
    }

    get getAnimals() {
        return cloneDeep(this.#animals)
    }

    get getNativeAnimals() {
        return this.#animals.filter(animal => animal.type === TYPES.Native)
    }

    get getPredators() {
        return this.#animals.filter(animal => animal.type === TYPES.Predators)
    }

    get getDogs() {
        return this.#animals.filter(animal => animal.type === TYPES.Defenders)
    }

    getAnimalsByIds(ids) {
        return ids.reduce((acc, id) => {
            const animal = this.#animals.find(a => a.id === id)
            acc.push(animal)
            return acc
        }, [])
    }

    _load() {
        return require('../database/animals.json')
    }
}

module.exports = AnimalsModel
