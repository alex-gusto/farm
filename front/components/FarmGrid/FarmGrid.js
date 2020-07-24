import React, { Component } from 'react'
import FarmAnimal from '~/front/components/FarmAnimal'

export default class FarmGrid extends Component {
  render () {
    const { farm, onSelect, market } = this.props

    return (
      <div className="farm-grid">
        {
          farm.map((animal, key) => <FarmAnimal
            key={key}
            {...animal}
            exchanger={market[ animal.id ]}
            onClick={() => onSelect(animal)}
          />)
        }
      </div>
    )
  }
}
