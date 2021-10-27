import React from 'react'
import { useRouteMatch } from 'react-router'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from 'react-router-dom'
import ShowData from './ShowData';

export default function Initialize() {
let match=useRouteMatch();

    return (
        <div className="loginContainer">
            <div className="wrapper">
                {/* <h1>You're Logged in!</h1>
                <br/>
                <h2>Press Initialize to show database.</h2>
                <br/>
                <button className="btn">Initialize</button> */}
            </div>

            <Switch>
                <Route to={match.path}>
                <h1>You're Logged in!</h1>
                <br/>
                <h2>Press Initialize to show database.</h2>
                <br/>
                <Link to={`${match.url}/showdata`}>
                    <button className="btn">Initialize</button>
                </Link>
                </Route>
                <Route to={`${match.path}/`}>
                    <ShowData/>
                </Route>
            </Switch>

        </div>
    )
}
