import './Login.css'
import React, { Component } from 'react'

{/*export default function Login() {
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
}*/}

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
    }

    // using arrow functions to avoid binding
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className = "loginContainer">
            <div className="wrapper">
                <h1>Log In</h1>
                <br />
                <form>
                    <label><b>Username</b>
                        <input type="text"
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            placeholder="Username..."/>
                    </label>
                    <br />
                    <label><b>Password</b>
                        <input type="password" 
                            name="password"
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            placeholder="Password..."/>
                    </label>
                    <br />
                    <button type="submit" 
                        onClick={this.handleSubmit}
                        className="submitbtn">Submit</button>
                </form>
            </div>
        </div>
        )
    }
}

