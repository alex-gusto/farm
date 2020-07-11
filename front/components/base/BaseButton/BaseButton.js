import React from 'react'

export default function BaseButton(props) {
    const { onClick, label, className } = props

    return (
        <button onClick={onClick} className="btn btn-outline-primary">
            {
                label || props.children
            }
        </button>
    )
}
