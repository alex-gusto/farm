import React from 'react'
import { NotificationContext } from '~/front/providers/NotificationProvider'

export default function Notification(props) {
    return (
        <NotificationContext.Consumer>
            {({ content, hide }) => {
                if (content) {
                    return (
                        <div className="notification">
                            <button onClick={hide} className="notification-close">x</button>
                            <div className="notification-content">{content}</div>
                        </div>
                    )
                } else {
                    return null
                }
            }}
        </NotificationContext.Consumer>
    )
}
