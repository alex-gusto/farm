import React from 'react'

export default function BaseButton(props) {
    const { onClick, label } = props

    return (
        <button onClick={onClick} className="btn btn-primary">
            {
                label || props.children
            }
        </button>
    )
}
