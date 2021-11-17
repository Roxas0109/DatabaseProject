import React, { useState } from 'react'

export default function CreateBlog() {

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    return (
        <div className="createCont">
            <h1>Create Blog</h1>
            <label>Subject: <input/></label>
            <label>Description: <input/></label>
            <label>Tags: <input/></label>
        </div>
    )
}
