import React, { useState } from 'react'
import './AddComment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { userSelector } from '../features/user/userSlice';



export default function AddComment() {

    const [show, setShow] = useState(false);
    const username = useSelector(userSelector);

    return (
        <>
            <button className={!show ? "btn" : "noShow"} onClick={() => {
                setShow(!show)
            }}>Add Comment</button>

            <div className={show ? "comment" : "noShow"}>
                <div className="commentWrapper">
                    <h3>User: {username}</h3>
                    <button className="btn like">
                        <FontAwesomeIcon icon="thumbs-up" />
                    </button>
                    <button className="btn like">
                        <FontAwesomeIcon icon="thumbs-down" />
                    </button>
                    <label><h3>Comment: </h3><textarea className="desc" /></label>
                    <br />
                    <button className={show ? "btn" : "noShow"} onClick={() => {
                        setShow(!show)
                    }}>Cancel</button>
                    <button className="btn">Post</button>
                </div>
            </div>
        </>
    )
}
