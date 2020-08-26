import React, { useContext } from 'react'
import './styles.scss'
import classnames from 'classnames'
import api from '~/front/api'

// Providers
import { NotificationContext } from '~/front/providers/NotificationProvider'
import BaseIconButton from '~/front/components/base/BaseIconButton/BaseIconButton'

export default function ({ farm, name, turn, isWinner, id, gameId, userId, disabled = false }) {
  const context = useContext(NotificationContext)
  const rootClasses = classnames([
    'player-block',
    { 'player-block--turn': turn },
    { 'player-block--winner': isWinner }
  ])

  const state = isWinner ? 'win!!!' : turn ? 'is moving' : ''

  const attack = async () => {
    try {
      await api.post(`/games/${gameId}/send-animals`, {
        toUserId: id,
        fromUserId: userId,
        id: 9
      })
    } catch ({ response }) {
      context.show({
        content: response.data,
        type: 'danger'
      })
    }
  }

  return (
    <div className={rootClasses}>
      <img className="player-block-bg" src="/img/rect-bg.png"/>

      <div className="player-block__name">
        {name} {state}

      </div>

      <div className="player-block__body">
        <div className="player-block__farm">
          {farm.filter(animal => animal.type < 2).map((animal, key) => {
            return (<div className="player-block__animal" key={key}>
              <img src={animal.image} alt={animal.name}/>
              <span className="player-block__count">{animal.total}</span>
            </div>)
          })}
        </div>

        <div className="player-block__buttons">
          <BaseIconButton onClick={attack} name="arrow" size="small" disabled={disabled} title="Attack"/>
        </div>
      </div>
    </div>
  )
}
