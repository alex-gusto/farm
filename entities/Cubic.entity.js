const cubic = require('@/database/cubic')
const random = require('lodash/random')

const BRINKS = 16

class CubicEntity {
    #cubics = []

    constructor() {
        this.#cubics = cubic.map(({ probability, name }) => {
            return probability.reduce((acc, p) => [...acc, ...this._fill(p)], [])
        })
    }

    _fill({ value, id }) {
        let p = BRINKS * value

        const arr = []
        while (p > 0) {
            arr.push(id)
            p--
        }

        return arr
    }

    throwDice() {
        return this.#cubics.map((arr) => {
            const index = random(BRINKS - 1, false)
            return arr[index]
        })
    }
}

module.exports = CubicEntity
