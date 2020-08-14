import React from 'react'
import createButton from '~/front/components/base/HOC/create-button'

function BaseIconButton (props) {
  const { onClick, name, type, disabled = false, className, title } = props

  const content = () => {
    if (props.children) return <span className="base-icon-button__inner">{props.children}</span>

    return (
      <svg style={{ width: '50%', height: '50%' }} className="base-icon-button__inner">
        <use xlinkHref={`#icon-${name}`}/>
      </svg>
    )
  }

  return (
    <button disabled={disabled} type={type} onClick={onClick} title={title} className={className}>
      {content()}
    </button>
  )
}

export default createButton(BaseIconButton, 'base-icon-button')
