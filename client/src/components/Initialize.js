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
        <>
            <h1>You're Logged in!</h1>
            <br />
            <h2>Press Initialize to show database.</h2>
            <br />
            <button className="btn" onClick={handleSubmit}>Initialize</button>
        </>
    )
}
