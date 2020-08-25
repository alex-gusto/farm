import api from '~/front/api'
import BaseButton from 'base/BaseButton'
import { withRouter } from 'react-router-dom'
import BaseTextField from 'base/BaseTextField'
import React, { Component, useState } from 'react'
import { NotificationContext } from '~/front/providers/NotificationProvider'
import io from '~/front/api/ws'

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

  submit = (e) => {
    e.preventDefault()
    const data = { name: this.state.name }

    if (this.state.gameId) {
      this.request({
        method: 'put',
        url: `/games/${this.state.gameId}`,
        data
      })
    } else {
      this.request({
        method: 'post',
        url: `/games`,
        data
      })
    }
  }

  request = async (setting = {}) => {
    const { history } = this.props
    try {
      const { data: { gameId, userId } } = await api(setting)
      const socket = io({ gameId, userId })
      socket.on('connect', () => {
        history.push(`/${gameId}/${userId}`)
      })
    } catch (err) {
      console.log(err)
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

          <BaseButton type="submit" color="orange" size="large">
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
