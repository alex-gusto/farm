class PlayerQueue {
  #queue = []
  #players = {}
  #current = 0

  get currentPlayerId () {
    return this.#queue[ this.#current ]
  }

  get players () {
    return Object.values(this.#players)
  }

  getPlayer (id) {
    return this.#players[ id ]
  }

  addPlayer (id, player) {
    this.#players[ id ] = player
    this.#queue.push(id)
  }

  deletePlayer (id) {
    delete this.#players[ id ]

    const index = this.#queue.findIndex(_id => _id === id)
    if (index > -1) {
      this.#queue.splice(index, 1)

      if (index === this.#current) {
        this.nextPlayer()
      }
    }
  }

  nextPlayer () {
    let index = this.#current
    index++

    if (index >= this.#queue.length) {
      index = 0
    }

    this.#current = index
  }

  checkPlayerTurn (id) {
    if (id !== this.currentPlayerId) {
      throw new Error('Not your turn!')
    }
  }
}

module.exports = PlayerQueue
