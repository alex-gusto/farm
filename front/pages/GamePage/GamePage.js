import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from "react-router-dom";
import io from '~/front/api/ws'
import PlayerList from './PlayerList'
import PlayerCanvas from '~/front/pages/GamePage/PlayerCanvas'
import cookie from 'cookie'

class GamePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            players: [],
            me: {
                farm: []
            }
        }

        this.getUserId()
    }

    get gameId() {
        const { match: { params: { gameId } } } = this.props
        return gameId
    }

    componentDidMount() {
        this.getPlayers()
        io.on('games:join', this.updatePlayers)
        io.on('games:update', this.updatePlayers)
    }

    componentWillUnmount() {
        io.off('games:join', this.updatePlayers)
        io.off('games:update', this.updatePlayers)
    }

    async getPlayers() {
        try {
            const { data } = await api(`/${this.gameId}/players`)
            this.updatePlayers(data)
        } catch (err) {
            const { history } = this.props
            history.push('/')
        }
    }

    getUserId() {
        const { user_id } = cookie.parse(document.cookie || '')
        this.userId = user_id
    }

    updatePlayers = ({ players }) => {
        console.log('players updated')
        // TODO: check user
        this.setState({
            players: players.filter(player => player.id !== this.userId),
            me: players.find(player => player.id === this.userId)
        })
    }

    render() {

        return (
            <div className="game-page">
                <aside className="game-page__sidebar">
                    <PlayerList players={this.state.players}/>
                </aside>

                <section className="game-page__inner">
                    <PlayerCanvas {...this.state.me}/>
                </section>

                <audio src="/audio/03386.mp3" autoplay loop style={{ visibility: 'hidden' }}></audio>
            </div>
        )
    }
}

export default withRouter(GamePage)
