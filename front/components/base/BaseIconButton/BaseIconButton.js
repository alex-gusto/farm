import React from 'react'
import createButton from '~/front/components/base/HOC/create-button'

function BaseIconButton (props) {
  const { onClick, name, type, disabled = false, className, title } = props

  return (
    <button disabled={disabled} type={type} onClick={onClick} title={title} className={className}>
      <svg className="base-icon-button__inner">
        <use xlinkHref={`#icon-${name}`}/>
      </svg>
    </button>
  )
}

export default createButton(BaseIconButton, 'base-icon-button')
