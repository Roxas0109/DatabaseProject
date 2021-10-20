import React from 'react'
import './Login.css'

export default function Login() {
    return (
        <div className = "loginContainer">
            <h1>Log In</h1>
            <br />
            <div className="wrapper">
                <label for="Username">Username</label>
                <input placeholder="Username..." id="Username"></input>
                <br />
                <label for="Password">Password</label>
                <input placeholder="Password..." id="Password"></input>
            </div>
        </div>
    )
}
