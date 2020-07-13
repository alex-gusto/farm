import React, { Component, createRef } from 'react'
import FarmAnimal from '~/front/components/FarmAnimal'

const FARM_BG = '/img/farm-bg.jpg'

export default class FarmGrid extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.loadBg()

    window.addEventListener('resize', this.setFarmGridStyle)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setFarmGridStyle)
  }

  loadBg () {
    const img = new Image()
    img.onload = () => {
      this.farmRatio = img.naturalWidth / img.naturalHeight
      this.setFarmGridStyle()
    }
    img.src = '/img/farm-bg.jpg'
  }

  setFarmGridStyle = () => {
    const height = this.gridHolderEl.clientHeight

    this.gridEl.style.height = `${height}px`
    this.gridEl.style.width = `${height * this.farmRatio}px`
    this.gridEl.style.background = `url(${FARM_BG}) center/contain`
  }

  render () {
    const { farm, onSelect } = this.props

    return (
      <div ref={(el) => this.gridHolderEl = el} className="farm-grid-holder">
        <div ref={(el) => this.gridEl = el} className="farm-grid">
          {
            farm.map((animal, key) => <FarmAnimal
              key={key} {...animal}
              className={`farm-animal--${key}`}
              onClick={() => onSelect(animal)}
            />)
          }
        </div>
      </div>
    )
  }
}
