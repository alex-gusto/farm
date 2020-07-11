import React, { Component } from 'react'
import PlayerBlock from './PlayerBlock'

class PlayerList extends Component {
  render () {
    const { players } = this.props

    let body
    if (players.length) {
      body = players.map((player, i) => <li key={i}><PlayerBlock {...player}/></li>)
    } else {
      body = <li>No players</li>
    }

    return (
      <ul className="player-list">
        {body}
      </ul>
    )
  }
}

export default PlayerList
