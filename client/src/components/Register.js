import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3001/api/insert',{
            username: username,
            password: password,
            passwordConfirm: passwordConfirm,
            firstName: firstName,
            lastName: lastName,
            email: email
        }).then((response)=>{
            if(response.data.fail){
                if(response.data.fail.passFail){
                    alert(response.data.fail.passFail)
                }
                if(response.data.fail.userFail){
                    alert(response.data.fail.userFail)
                    console.log("user fail")
                }
                if(response.data.fail.emailFail){
                    alert(response.data.fail.emailFail)
                    console.log("email fail")
                }
            }
            else{
                alert(response.data.pass)
            }
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
                    <label><b>Confirm Password</b>
                        <input type="password" 
                            name="passwordConfirm"
                            onChange={(e)=>{
                                setPasswordConfirm(e.target.value);
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
                            className="btn">Submit</button>
                            {/* className="btn"><Link to ='/' className="regSub">Submit</Link></button> */}
                </form>
            </div>
        </div>
    )
}
