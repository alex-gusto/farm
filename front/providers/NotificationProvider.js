import React, { createContext, useCallback, useState } from 'react'

export const NotificationContext = createContext({
    content: null,
    show: () => {},
    hide: () => {}
})

NotificationContext.displayName = 'NotificationContext'

export default function NotificationProvider({ children }) {
    const [content, setContent] = useState(null);

    const hide = () => setContent(null);
    const show = (message) => setContent(message);

    const contextValue = {
        content,
        show: (message, status) => show(message, status),
        hide: () => hide()
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    )
}
