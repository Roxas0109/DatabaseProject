import React, { useState } from 'react';
import './CreateBlog.css';
import { useSelector } from 'react-redux';
import { userSelector } from '../features/user/userSlice';

export default function CreateBlog() {

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const username = useSelector(userSelector);

    const handlePost = () => {
        console.log(subject);
        console.log(description);
        console.log(tags);
    }

    return (
        <div className="createCont">
            <div className="createWrapper">
                <h1>Create Blog</h1>
                <h3>Current User: {username}</h3>
                <label>
                    <h3>Subject: </h3>
                    <input type="text" onChange={(e) => setSubject(e.target.value)} /></label>
                <label>
                    <h3>Description: </h3>
                    <textarea onChange={(e) => setDescription(e.target.value)} /></label>
                <label>
                    <h3>Tags: </h3>
                    <input type="text" onChange={(e) => setTags(e.target.value)} /></label>
                <button className="btn" onClick={handlePost}>Post</button>
            </div>
        </div>
    )
}