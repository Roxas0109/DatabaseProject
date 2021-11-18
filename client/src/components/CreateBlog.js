import React, { useState } from 'react'
import './CreateBlog.css'

export default function CreateBlog() {

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    return (
        <div className="createCont">
            <div className="createWrapper">
                <h1>Create Blog</h1>
                <label><h3>Subject: </h3><input type="text" /></label>
                <label><h3>Description: </h3><textarea className="desc"/></label>
                <label><h3>Tags: </h3><input type="text" /></label>
            </div>
        </div>
    )
}
