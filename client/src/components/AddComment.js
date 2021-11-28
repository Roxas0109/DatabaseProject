import React, { useState } from 'react'
import './AddComment.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function AddComment({blogid}) {
    const [show, setShow] = useState(false);
    const [sentiment, setSentiment] = useState(true);
    const [description, setDescription] = useState('');

    const username = window.localStorage.getItem("username");

    const handleLike = () => {
        setSentiment(!sentiment);
    }

    const handlePost = (e) => {
        e.preventDefault();
        console.log(username)
        axios.post('http://localhost:3001/api/addcomment', {
            posted_by: username,
            sentiment: sentiment,
            description:description,
            blogid:blogid,
        }).then((response) => {  
            console.log(response)                  
            if (response.data.fail) {
                if(response.data.fail.countFail){
                    alert(response.data.fail.countFail)
                }
                if(response.data.fail.userFail){
                    alert(response.data.fail.userFail)
                }
            }
            else {
                alert(response.data.pass)
                window.location.reload();
            }
        })
    }

    return (
        <>
            <button className={!show ? "btn" : "noShow"} onClick={() => {
                setShow(!show)
            }}>Add Comment</button>

            <div className={show ? "comment" : "noShow"}>
                <div className="commentWrapper">
                    <h3>User: {username}</h3>
                    <button className={sentiment ? "btn active" : "btn not-active"} onClick={handleLike}>
                        <FontAwesomeIcon icon="thumbs-up" />
                    </button>
                    <button className={sentiment ? "btn not-active" : "btn active"} onClick={handleLike}>
                        <FontAwesomeIcon icon="thumbs-down" />
                    </button>
                    <label>
                        <h3>Comment: </h3>
                        <textarea className="desc" onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <br />
                    <button className={show ? "btn" : "noShow"} onClick={() => {
                        setShow(!show)
                    }}>Cancel</button>
                    <button type = "submit" className="btn" onClick={handlePost}>Post</button>
                </div>
            </div>
        </>
    )
}
