import React from 'react'
import './styles.scss'
import classnames from 'classnames'

export default function ({ farm, name, turn, isWinner }) {
  const rootClasses = classnames([
    'player-block',
    { 'player-block--turn': turn },
    { 'player-block--winner': isWinner }
  ])

  const state = isWinner ? 'win!!!' : turn ? 'is moving' : ''

  return (
    <div className={rootClasses}>
      <img className="player-block-bg" src="/img/rect-bg.png"/>

      <div className="player-block__name">
        {name} {state}
      </div>

      <div className="player-block__farm">
        {farm.map((animal, key) => {
          return (<div className="player-block__animal" key={key}>
            {animal.name}
            <span className="player-block__count">{animal.total}</span>
          </div>)
        })}
      </div>
    </div>
  )
}
