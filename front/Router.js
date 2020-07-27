import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:gameId">
                    <GamePage/>
                </Route>

                <Route exact path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
