import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'

export default function Router() {
    return (
        <BrowserRouter>
            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link to="/">New game</Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}

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
