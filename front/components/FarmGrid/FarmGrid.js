import React, { Component } from 'react'
import FarmAnimal from '~/front/components/FarmAnimal'

export default class FarmGrid extends Component {
  render () {
    const { farm, onSelect } = this.props

    return (
      <div className="farm-grid">
        {
          farm.map((animal, key) => <FarmAnimal
            key={key} {...animal}
            onClick={() => onSelect(animal)}
          />)
        }
      </div>
    )
  }
}
