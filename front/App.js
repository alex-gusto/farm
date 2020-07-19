import './assets/scss/app.scss'

import React from 'react'
import Router from './Router'
import NotificationProvider from '~/front/providers/NotificationProvider'
import Notification from '~/front/components/Notification'

export default function App () {
  return (
    <div className="game-bg">
      <NotificationProvider>
        <Router/>
        <Notification/>
      </NotificationProvider>
    </div>
  )
}

