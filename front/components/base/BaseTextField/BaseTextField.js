import React, { useState } from 'react'

const { v4: uuid } = require('uuid')

export default function BaseTextField({ value, onChange, placeholder, className }) {
    const [uid] = useState(uuid())

    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={uid}>{placeholder}</label>
            <input
                id={uid}
                type="text"
                value={value}
                className="form-control"
                onChange={({ target: { value } }) => onChange(value)}
            />
        </div>
    )
}
