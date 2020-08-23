import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import io, { disconnect } from '~/front/api/ws'
import TheMenu from './TheMenu'
import PlayerList from './PlayerList'
import PlayerCanvas from '~/front/pages/GamePage/PlayerCanvas'
// import AudioPlayer from '~/front/components/AudioPlayer'
import OverLayer from '~/front/components/OverLayer'

class GamePage extends Component {
  state = {
    players: [],
    me: {
      farm: []
    }
  }

  get gameId () {
    const { match: { params: { gameId } } } = this.props
    return gameId
  }

  get userId () {
    const { match: { params: { userId } } } = this.props
    return userId
  }

  get socket () {
    return io({ gameId: this.gameId, userId: this.userId })
  }

  componentDidMount () {
    this.getPlayers()
    this.socket.on('games:update', this.updatePlayers)
  }

  componentWillUnmount () {
    this.socket.off('games:update', this.updatePlayers)
    disconnect()
  }

  async getPlayers () {
    try {
      const { data } = await api(`/games/${this.gameId}`)
      this.updatePlayers(data)
    } catch (err) {
      const { history } = this.props
      history.push('/')
    }
  }

  updatePlayers = ({ players }) => {
    // TODO: check user
    this.setState({
      players: players.filter(player => player.id !== this.userId),
      me: players.find(player => player.id === this.userId)
    })
  }

  render () {
    const { me, players } = this.state

    return (
      <div className="game-page">
        <aside className="game-page__sidebar">
          <PlayerList players={players} turn={me.turn}/>
        </aside>

        <section className="game-page__inner">
          <PlayerCanvas {...me}/>
        </section>

        <TheMenu/>
        {
          me.isWinner && (
            <OverLayer>
              <div className="py-3 px-4 text-center bg-light rounded">
                <h2 style={{ color: 'tomato', fontSize: '45px' }}>You win!!!</h2>
                <button className="btn btn-primary btn-sm"
                        onClick={() => this.props.history.push('/')}>New Game
                </button>
              </div>
            </OverLayer>
          )
        }

        {/*<AudioPlayer/>*/}

        {/*<footer>*/}
        {/*<a href='https://www.freepik.com/free-photos-vectors/menu'>Menu vector created by vectorpouch -*/}
        {/*www.freepik.com</a>*/}
        {/*</footer>*/}
      </div>
    )
  }
}

export default withRouter(GamePage)
