import React, { useState } from 'react'
import './AddComment.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { userSelector } from '../features/user/userSlice';



export default function AddComment() {

    const [show, setShow] = useState(false);
    const [like, setLike] = useState(true);
    const [comment, setComment] = useState('');

    const username = useSelector(userSelector);

    const handleLike = () => {
        setLike(!like);
    }

    const handlePost = (e) => {
        e.preventDefault();
        console.log(username)
        axios.post('http://localhost:3001/api/addcomment', {
            username: username,
            like: like,
            comment:comment,
        }).then((response) => {  
            console.log(response)                  
            if (response.data.fail) {
                alert(response.data.fail.countFail)
            }
            else {
                alert(response.data.pass)
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
                    <button className={like ? "btn active" : "btn not-active"} onClick={handleLike}>
                        <FontAwesomeIcon icon="thumbs-up" />
                    </button>
                    <button className={like ? "btn not-active" : "btn active"} onClick={handleLike}>
                        <FontAwesomeIcon icon="thumbs-down" />
                    </button>
                    <label>
                        <h3>Comment: </h3>
                        <textarea className="desc" onChange={(e) => setComment(e.target.value)} />
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
