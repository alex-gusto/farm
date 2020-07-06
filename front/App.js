import './assets/scss/app.scss';

import React from 'react';
import Router from './Router'
import APIErrorProvider from '~/front/providers/APIErrorProvider'
import Notification from '~/front/components/Notification'

export default function App() {
    return (
        <div className="game-bg"><APIErrorProvider>
            <Router/>
            <Notification/>
        </APIErrorProvider></div>
    )
}

