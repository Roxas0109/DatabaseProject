import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.fail) {
                alert(response.data.fail)
            }
            else {
                console.log(response.data.pass)
                navigate('home')
            }
        })
    }

    return (
        <div className="loginContainer">
            <div className="wrapper">
                <h1>Log In</h1>
                <br />
                <form>
                    <label><b>Username</b>
                        <input type="text"
                            name="username"
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                            placeholder="Username..." />
                    </label>
                    <br />
                    <label><b>Password</b>
                        <input type="password"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="Password..." />
                    </label>
                    <br />
                    <button type="submit" onClick={handleSubmit}
                        className="btn">Submit</button>
                    <Link to="register">
                        <button type="submit"
                            className="btn">Register</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
