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
            <Switch>
                <Route exact path={match.path}>
                <h1>You're Logged in!</h1>
                <br/>
                <h2>Press Initialize to show database.</h2>
                <br/>
                <Link to={`${match.url}/showdata`}>
                    <button className="btn">Initialize</button>
                </Link>
                </Route>

                <Route path={`${match.path}/showdata`}>
                    <ShowData/>
                </Route>
            </Switch>
            </div>

        </div>
    )
}
