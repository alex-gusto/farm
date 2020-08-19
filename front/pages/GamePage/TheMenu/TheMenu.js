import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import api from '~/front/api'

// base
import BaseIconButton from 'base/BaseIconButton'

class TheMenu extends Component {
  state = {
    isOpen: false
  }

  handleMenuClick = () => {
    this.setState(state => state.isOpen = !state.isOpen)
  }

  get gameId () {
    const { match: { params: { gameId } } } = this.props
    return gameId
  }

  exitGame = () => {
    api.delete(`/games/${this.gameId}`)
    this.props.history.push('/')
  }

  render () {
    const { isOpen } = this.state

    return <nav className="menu">
      <BaseIconButton
        onClick={this.handleMenuClick}
        size='medium'
        color="orange"
        name={isOpen ? 'cross' : 'hamburger'}
      />

      <div className={`menu-list ${isOpen ? 'menu-list--opened' : ''}`}>
        <BaseIconButton
          size='medium'
          color="blue"
          title="Exit game"
          className="menu-list__button"
          onClick={this.exitGame}
        >
          Exit
        </BaseIconButton>

        <BaseIconButton
          size='medium'
          color="blue"
          className="menu-list__button"
        >
          Get ID
        </BaseIconButton>
      </div>
    </nav>
  }
}

export default withRouter(TheMenu)
