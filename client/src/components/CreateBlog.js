import React, { useState } from 'react';
import axios from 'axios';
import './CreateBlog.css';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {
    const navigate = useNavigate()

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const username = window.localStorage.getItem("username");

    const handlePost = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/createblog', {
            description: description,
            subject: subject,
            created_by: username,
            tags: tags,
        }).then((response) => {
            if(response.err){
                console.log(response.err)
            }
            if (response.data.fail) {
                alert(response.data.fail)
            }
            else {
                alert(response.data.pass)
                navigate('/home')
            }
        })
    }

    return (
        <div className="createCont">
            <div className="createWrapper">
                <h1>Create Blog</h1>
                <h3>Current User: {username}</h3>
                <label>
                    <h3>Subject: </h3>
                    <input type="text" onChange={(e)=>setSubject(e.target.value)}/></label>
                <label>
                    <h3>Description: </h3>
                    <textarea onChange={(e)=>setDescription(e.target.value)}/></label>
                <label>
                    <h3>Tags: </h3>
                    <input type="text" onChange={(e)=>setTags(e.target.value)}/></label>
                <button className="btn" onClick={handlePost}>Post</button>
            </div>
        </div>
    )
}
