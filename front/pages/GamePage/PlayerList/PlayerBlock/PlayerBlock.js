import React from 'react'
import './styles.scss'
import classnames from 'classnames'

export default function ({ farm, name, turn }) {
  const rootClasses = classnames([
    'player-block',
    { 'player-block--active': turn }
  ])

  return (
    <div className={rootClasses}>
      <div className="player-block__name">{name} {turn && 'is moving'}</div>

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
