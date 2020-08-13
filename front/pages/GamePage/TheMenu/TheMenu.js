import React, { Component } from 'react'

// base
import BaseIconButton from 'base/BaseIconButton'

class TheMenu extends Component {
  state = {
    isOpen: false
  }

  handleMenuClick = () => {
    this.setState(state => state.isOpen = !state.isOpen)
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
        <BaseIconButton size='medium' color="blue" name="arrow" title="Exit game" className="menu-list__button"/>
        <BaseIconButton size='medium' color="blue" name="arrow" title="Exit game" className="menu-list__button"/>
      </div>
    </nav>
  }
}

export default TheMenu
