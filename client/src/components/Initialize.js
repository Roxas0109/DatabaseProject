import React from 'react'
import { useRouteMatch } from 'react-router'
import {
    Switch,
    Route,
    useHistory,
  } from 'react-router-dom'
import ShowData from './ShowData';
import axios from 'axios';

export default function Initialize() {
    let match=useRouteMatch();
    const history = useHistory()
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.get('http://localhost:3001/api/sqlIns',{

        }).then((response)=>{
            if(response.data.err){
                console.log(response.data.err)
            }
            else{  
                console.log(response.data);
                history.push(`${match.path}/showdata`)
            }
        })
    }
    return (
        <div className="loginContainer">
            <div className="wrapper">
            <Switch>
                <Route exact path={match.path}>
                <h1>You're Logged in!</h1>
                <br/>
                <h2>Press Initialize to show database.</h2>
                <br/>
                <button className="btn" onClick={handleSubmit}>Initialize</button>
                </Route>
                <Route path={`${match.path}/showdata`}>
                    <ShowData/>
                </Route>
            </Switch>
            </div>

        </div>
    )
}
