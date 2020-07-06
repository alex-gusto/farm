import React, { Component } from 'react'
import io from '~/front/api'
import PlayerBlock from './PlayerBlock'

class PlayerList extends Component {
    componentDidMount() {
        const { gameId } = this.props
        // io.emit("getPlayers", { gameId })
        // io.on('updatePlayers', this.updatePlayers)
    }

    componentWillUnmount() {
        // io.off('updatePlayers', this.updatePlayers)
    }

    render() {
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
