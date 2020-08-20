import React, { Component, Fragment } from 'react'
import PlayerBlock from './PlayerBlock'
import { withRouter } from 'react-router-dom'

class PlayerList extends Component {
  get gameId () {
    const { match: { params: { gameId } } } = this.props
    return gameId
  }

  render () {
    const { players, turn } = this.props

    let body
    if (players.length) {
      body = players.map((player, i) => <li key={i}><PlayerBlock {...player} disabled={!turn} gameId={this.gameId}/></li>)
    } else {
      body = <li>No players</li>
    }

    return (
      <Fragment>
        <ul className="player-list">
          {body}
        </ul>
      </Fragment>
    )
  }
}

export default withRouter(PlayerList)
