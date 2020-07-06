import React from 'react'

export default function Notification(props) {
    const { content, title, timeout } = props

    const close = () => {

    }

    return (
        <div className="notification">
            <button onClick={close} className="notification-close">x</button>
            <div className="notification-content">{content}</div>
        </div>
    )
}
