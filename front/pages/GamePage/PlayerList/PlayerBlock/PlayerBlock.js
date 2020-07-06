import React from 'react'
import './styles.scss'

export default function ({ farm, name }) {
    return (
        <div className="player-block">
            <div className="player-block__name">{name}</div>

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
