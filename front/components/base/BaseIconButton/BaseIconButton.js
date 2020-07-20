import React from 'react'
import classnames from 'classnames'

export default function BaseButton (props) {
  const { onClick, label, type = 'button', disabled = false, className } = props

  const rootClasses = classnames([
    'base-icon-button',
    className,
    {
      'base-icon-button--disabled': disabled
    }
  ])

  return (
    <button disabled={disabled} type={type} onClick={onClick} className={rootClasses}>
            <span className="base-icon-button__inner">
                {
                  label || props.children
                }
            </span>
    </button>
  )
}
