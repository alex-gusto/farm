import React, { useState } from 'react'
import classnames from 'classnames'

const { v4: uuid } = require('uuid')

export default function BaseTextField ({ value, onChange, label, className = '', size = 'large' }) {
  const [ uid ] = useState(uuid())

  const rootClasses = classnames([
    'base-text-field',
    className,
    `base-text-field--${size}`
  ])

  return (
    <div className={rootClasses}>
      <label htmlFor={uid} className="base-text-field__label">{label}</label>
      <div className="base-text-field__input">
        <input
          id={uid}
          type="text"
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
        />
      </div>
    </div>
  )
}
