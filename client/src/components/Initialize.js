import React from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Initialize() {

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:3001/api/sqlIns', {

        }).then((response) => {
            if (response.data.err) {
                console.log(response.data.err)
            }
            else {
                console.log(response.data);
                navigate(`showdata`)
            }
        })
    }
    return (
        <div className="loginContainer">
            <h1>Press Initialize to run database script.</h1>
            <br />
            <button className="btn" onClick={handleSubmit}>Initialize</button>
        </div>
    )
}
