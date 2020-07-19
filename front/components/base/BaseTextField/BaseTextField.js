import React, { useState } from 'react'

const { v4: uuid } = require('uuid')

export default function BaseTextField ({ value, onChange, label, className }) {
  const [ uid ] = useState(uuid())

  return (
    <div className={`base-text-field ${className}`}>
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
