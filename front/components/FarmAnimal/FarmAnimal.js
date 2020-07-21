import React from 'react'
import classnames from 'classnames'

export default function (props) {
  const { name, total, type, onClick, selectable = true, image, className, isNameHidden } = props
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

  return (
    <div className={rootClassName} onClick={onClick}>
      <img src={bg()} className="farm-animal-bg" alt=""/>
      <img src={image} alt="" className="farm-animal-image"/>
      {nameContent}
    </div>
  )
}
