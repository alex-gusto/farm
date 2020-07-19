import api from '~/front/api'
import BaseButton from 'base/BaseButton'
import { withRouter } from 'react-router-dom'
import BaseTextField from 'base/BaseTextField'
import React, { Component, useState } from 'react'
import { NotificationContext } from '~/front/providers/NotificationProvider'

class HomePage extends Component {
  static contextType = NotificationContext

  constructor (props) {
    super(props)

    this.state = {
      gameId: '',
      name: ''
    }
  }

  // methods
  changeGameId = (value) => {
    this.setState({
      gameId: value
    })
  }

  changeName = (value) => {
    this.setState({
      name: value
    })
  }

  createGame = async () => {
    const { history } = this.props
    const { data: { gameId } } = await api.post('/games/create', { name: this.state.name })
    history.push(`/${gameId}`)
  }

  joinGame = async () => {
    const { history } = this.props
    try {
      const { data: { gameId } } = await api.put(`/games/${this.state.gameId}`, { name: this.state.name })
      history.push(`/${gameId}`)
    } catch (err) {
    }
  }

  submit = (e) => {
    e.preventDefault()

    if (this.state.gameId) {
      this.joinGame()
    } else {
      this.createGame()
    }
  }

  render () {
    const { gameId, name } = this.state

    return (
      <div className="home-page">

        <div className="game-name">
        </div>

        <h2 className="game-title">FARM</h2>

        <form onSubmit={this.submit} className="new-game-form">
          <BaseTextField
            value={name}
            label="Enter your name"
            onChange={this.changeName}
            className="form-spacer"
          />

          <BaseTextField
            className="form-spacer"
            value={gameId}
            label="Game ID"
            type="submit"
            onChange={this.changeGameId}
          />

          <BaseButton type="submit">
            {
              gameId ? 'Join game' : 'New game'
            }
          </BaseButton>
        </form>
      </div>
    )
  }
}

export default withRouter(HomePage)
