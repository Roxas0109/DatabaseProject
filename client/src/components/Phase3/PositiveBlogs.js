import React, { useState } from 'react'
import axios from 'axios'
import './phase3.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PositiveBlogs() {

    const [blogsList, setBlogsList] = useState([])
    const [commentsList, setCommentsList] = useState([])
    const [userName, setUsername] = useState('')

    const getComments = async () => {
        await axios.post('http://localhost:3001/api/getPositiveComments', {
            created_by: userName
        }).then(response => {
            setCommentsList(response.data);
            console.log(commentsList)
        })
    }

    const getPositiveBlogs = async () => {
        await axios.post('http://localhost:3001/api/getPositiveBlogs', {
            created_by: userName
        }).then(response => {
            setBlogsList(response.data);
            console.log(blogsList)
        })
    }

    const likeIcon = (sentiment) => {
        if (sentiment === 'positive') {
            return (<FontAwesomeIcon icon="thumbs-up" />)
        }
        else {
            return (<FontAwesomeIcon icon="thumbs-down" />)
        }
    }

    const sortComments = (currentId) => {
        const spComments = [];
        for (var i = 0; i < commentsList.length; i++) {
            if (commentsList[i].blogid === currentId) {
                spComments.push(commentsList[i])
            }
        }

        return spComments
    }

    const displayBlogs = blogsList.map((item) => {
        const spComments = sortComments(item.blogid)
        return (
            <div className="pbBlogs">
                <h3>{item.subject}</h3>
                <h4>Created by: {item.created_by}</h4>
                <p>{item.description}</p>
                <p>Tags: {item.tags}</p>
                {spComments.map((item) => {
                    return (
                        <div className="comments">
                            <div className="commentsWrapper">
                                <h4>Posted by: {item.posted_by}</h4>
                                <p>{likeIcon(item.sentiment)} {item.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    })

    return (
        <>
            <div className='pbCont'>
                <div className="pbWrapper">
                    <h1>Blogs of specific user that only has positive comments</h1>
                    <h3>Enter Username:</h3>
                    <label> <b>Username</b> <input onChange={(e) => {
                        setUsername(e.target.value)
                    }} /></label>
                    <button className='btn' onClick={() => {
                        getPositiveBlogs()
                        getComments()
                    }}>Find Blogs</button>
                </div>
            </div>
            {displayBlogs}
        </>
    )
}
