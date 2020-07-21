import React, { Component, Fragment } from 'react'
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
      <Fragment>
        <h3 className="text-white">Players</h3>
        <ul className="player-list">
          {body}
        </ul>
      </Fragment>
    )
  }
}

export default PlayerList
