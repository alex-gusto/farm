import React, { useEffect } from 'react'
import classnames from 'classnames'
import { NotificationContext } from '~/front/providers/NotificationProvider'

export default function Notification() {

    return (
        <NotificationContext.Consumer>
            {({ data, hide }) => {
                const { content, type } = data
                const className = classnames([
                    'notification alert',
                    `alert-${type}`,
                    {
                        'notification--opened': content
                    }
                ])

                return (
                    <div className={className}>
                        <button onClick={hide} className="notification-close">x</button>
                        <div className="notification-content">{content}</div>
                    </div>
                )
            }}
        </NotificationContext.Consumer>
    )
}
