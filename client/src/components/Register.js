import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3001/api/insert',{
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        }).then(()=>{
            alert('Registered!');
        })
    }

    return (
        <div className = "loginContainer">
            <div className="wrapper">
                <h1>Register</h1>
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
                    <label><b>First Name</b>
                            <input type="text" 
                                name="firstName"
                                onChange={(e)=>{
                                    setFirstName(e.target.value);
                                }} 
                                placeholder="First Name..."/>
                        </label>
                        <br />
                        <label><b>Last Name</b>
                            <input type="text" 
                                name="lastName"
                                onChange={(e)=>{
                                    setLastName(e.target.value);
                                }} 
                                placeholder="Last Name..."/>
                        </label>
                        <br />
                        <label><b>Email</b>
                            <input type="email" 
                                name="email"
                                onChange={(e)=>{
                                    setEmail(e.target.value);
                                }} 
                                placeholder="Email..."/>
                        </label>
                        <br />
                        <button type="submit" 
                            onClick={handleSubmit}
                            className="btn"><Link to ='/' className="regSub">Submit</Link></button>
                </form>
            </div>
        </div>
    )
}
