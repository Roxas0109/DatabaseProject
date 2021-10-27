import React, { Component } from 'react'
import axios from 'axios';

export default class Register extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            firstName:'',
            lastName:'',
            email:''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:3001/api/insert',{
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }).then(()=>{
            console.log('successful insert!')
        })
    }

    render() {
        return (
            <div className = "loginContainer">
                <div className="wrapper">
                    <h1>Register</h1>
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
                        <label><b>First Name</b>
                            <input type="text" 
                                name="firstName"
                                value={this.state.firstName} 
                                onChange={this.handleChange} 
                                placeholder="First Name..."/>
                        </label>
                        <br />
                        <label><b>Last Name</b>
                            <input type="text" 
                                name="lastName"
                                value={this.state.lastName} 
                                onChange={this.handleChange} 
                                placeholder="Last Name..."/>
                        </label>
                        <br />
                        <label><b>Email</b>
                            <input type="email" 
                                name="email"
                                value={this.state.email} 
                                onChange={this.handleChange} 
                                placeholder="Email..."/>
                        </label>
                        <br />
                        <button type="submit" 
                            onClick={this.handleSubmit}
                            className="btn">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
