import React from 'react'
import classnames from 'classnames'

const convertCoef = (coef) => {
  coef = coef.split('/')

  if (coef.length === 1) {
    coef.push(1)
  }

  coef = coef.reverse()

  if (+coef[ 1 ] === 1) {
    return coef[ 0 ]
  }

  return coef.join('/')
}

export default function (props) {
  const { name, total, type, onClick, selectable = true, image, className, isNameHidden, exchanger } = props
  const rootClassName = classnames([
    className,
    'farm-animal',
    {
      'farm-animal--unselectable': !selectable
    }
  ])

  const nameContent = isNameHidden ? '' : <div className="farm-animal-label">
    {name}
    <span>{total}</span>
  </div>

  const bg = () => {
    switch (type) {
    case 2:
      return '/img/red-cell-bg.png'

    default:
      return '/img/cell-bg.png'
    }
  }

  const exchangerContent = () => {
    if (!exchanger) return

    const animals = exchanger.map(({ animal, coef }) => (
      <div className="farm-animal-exchanger__animal" data-coef={convertCoef(coef)}>
        <img src={animal.image} alt={animal.name}/>
      </div>
    ))

    return <div className="farm-animal-exchanger">{animals}</div>
  }

  return (
    <div className={rootClassName} onClick={onClick}>
      {exchangerContent()}
      <img src={bg()} className="farm-animal-bg" alt=""/>
      <img src={image} alt="" className="farm-animal-image"/>
      {nameContent}
    </div>
  )
}
