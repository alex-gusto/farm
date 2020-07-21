const random = require('lodash/random')

class CubicEntity {
  #cubics = []

  constructor (config) {
    this.#cubics = config.map(({ probability }) => {
      return probability.reduce((acc, p) => [ ...acc, ...this._fill(p) ], [])
    })
  }

  get brinks () {
    return this.#cubics[ 0 ].length - 1
  }

  _fill ({ times, id }) {
    let p = times

    const arr = []
    while (p > 0) {
      arr.push(id)
      p--
    }

    return arr
  }

  throwDice () {
    return this.#cubics.map((arr) => {
      const index = random(this.brinks, false)
      return arr[ index ]
    })
  }
}

module.exports = CubicEntity
