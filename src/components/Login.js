import React from 'react'
import './Login.css'

export default function Login() {
    const handleSubmit = ()=>{
        console.log("Hello")
    }

    return (
        <div className = "loginContainer">
            <div className="wrapper">
                <h1>Log In</h1>
                <br />
                <label><b>Username</b></label>
                <input placeholder="Username..."></input>
                <br />
                <label><b>Password</b></label>
                <input placeholder="Password..."></input>
                <br />
                <button onClick={handleSubmit} className="submitbtn">Submit</button>
            </div>
        </div>
    )
}
