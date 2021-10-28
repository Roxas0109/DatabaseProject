import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3001/api/login',{
            username: username,
            password: password,
        }).then((response)=>{
            if(response.data.message){
                alert(response.data.message)
            }
            else{
                console.log(response.data)
                return <Link to="/initialize"></Link>
            }
        })
    }

    return (
        <div className = "loginContainer">
            <div className="wrapper">
                <h1>Log In</h1>
                <br />
                <form>
                    <label><b>Username</b>
                        <input type="text"
                            name="username"
                            onChange={(e)=>{
                                setUserName(e.target.value);
                            }} 
                            placeholder="Username..."/>
                    </label>
                    <br />
                    <label><b>Password</b>
                        <input type="password" 
                            name="password"
                            onChange={(e)=>{
                                setPassword(e.target.value);
                            }} 
                            placeholder="Password..."/>
                    </label>
                    <br />
                    <Link to="/initialize">
                    <button type="submit" onClick={handleSubmit}
                        className="btn">Submit</button>
                    </Link>
                    <Link to="/register">
                    <button type="submit" 
                        className="btn">Register</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
