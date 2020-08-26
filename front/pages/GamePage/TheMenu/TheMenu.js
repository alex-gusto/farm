import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import api from '~/front/api'
import copyBuffer from '~/front/assets/js/helpers/copy-buffer'
// base
import BaseIconButton from 'base/BaseIconButton'

class TheMenu extends Component {
  state = {
    isOpen: false,
    isCopied: false
  }

  handleMenuClick = () => {
    this.setState(state => state.isOpen = !state.isOpen)
  }

  get gameId () {
    const { match: { params: { gameId } } } = this.props
    return gameId
  }

  componentDidMount () {
    document.addEventListener('click', this.handleMenuClose)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleMenuClose)
  }

  handleMenuClose = () => {
    this.setState(state => state.isOpen = false)
  }

  handleExitGame = () => {
    api.delete(`/games/${this.gameId}`)
    this.props.history.push('/')
  }

  handleCopyId = () => {
    copyBuffer(this.gameId)
      .then(() => {
        this.setState(state => state.isCopied = true)
        setTimeout(() => {
          this.setState(state => {
            state.isCopied = false
            state.isOpen = false
            return state
          })
        }, 1000)
      })
      .catch(e => console.log(e))
  }

  render () {
    const { isOpen, isCopied } = this.state

    return <nav className="menu" onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
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
          onClick={this.handleExitGame}
        >
          Exit
        </BaseIconButton>

        <BaseIconButton
          size='medium'
          color={isCopied ? 'orange' : 'blue'}
          className="menu-list__button"
          onClick={this.handleCopyId}
        >
          {isCopied ? 'Copied' : 'Get ID'}
        </BaseIconButton>
      </div>
    </nav>
  }
}

export default withRouter(TheMenu)
