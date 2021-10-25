import './Login.css'
import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            //for testing
            userList: []
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
        /*axios.post('http://localhost:3001/api/insert',{
            username: this.state.username,
            password: this.state.password,
            firstName: "Alan",
            lastName: "Hern",
            email: "hp2"
        }).then(()=>{
            console.log('successful insert!')
        })*/
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/get').then((response)=>{
            //this.state.userList = response.data
            this.setState({
                userList: response.data
            })
        })
    }

    componentDidUpdate(){
        axios.get('http://localhost:3001/api/get').then((response)=>{
            //this.state.userList = response.data
            this.setState({
                userList: response.data
            })
        })
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
                    <ul>
                        <Link to='/register'>Register!</Link>
                    </ul>
                    {/* for testing */}
                    <h3>Current Users</h3>
                    {this.state.userList.map((val)=>{
                        return <h4>{val.username}, {val.password}, {val.firstName}, {val.lastName}, {val.email}</h4>
                    })}
                </div>
            </div>
        )
    }
}

