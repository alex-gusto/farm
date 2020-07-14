const priv = new Map()
const cloneDeep = require('../utils/clone-deep')

const toMap = (arr, key = 'id') => {
    return arr.reduce((acc, item) => acc.set(item[key], item), new Map())
}

class MarketModel {
    #quizzes = []

    constructor() {
        this.#quizzes = this._load()
    }

    get quizzes() {
        return this.#quizzes
    }

    getRandomQuiz() {
        return this.#quizzes[0]
    }

    _load() {
        return require('../database/quizzes')
    }
}

module.exports = MarketModel
