import React, { createContext, useState } from 'react'
import { withRouter } from 'react-router-dom'

export const NotificationContext = createContext({
  data: {},
  show: () => {
  },
  hide: () => {
  }
})

NotificationContext.displayName = 'NotificationContext'

export default function NotificationProvider({ children }) {
  const [data, setContent] = useState({});

  const hide = () => setContent({});
  const show = data => {
    setContent(data)
    setTimeout(hide, 1500)
  };

  const contextValue = {
    data,
    show: data => show(data),
    hide: () => hide()
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}
