import React from 'react'
import classnames from 'classnames'

export default function BaseButton (props) {
  const { onClick, label, type = 'button', theme = 'main', color } = props

  const rootClasses = classnames([
    'base-button',
    `base-button--${theme}`,
    color && `base-button--${color}`
  ])

  return (
    <button type={type} onClick={onClick} className={rootClasses}>
            <span className="base-button__inner">
                {
                  label || props.children
                }
            </span>
    </button>
  )
}
