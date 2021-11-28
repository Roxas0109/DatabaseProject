import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddComment from './AddComment'
import './CommentBlog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CommentBlog() {

    const [blogList, setBlogList] = useState([])
    const [commentsList, setCommentsList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/api/getblogs').then((response) => {
            setBlogList(response.data)
        });
        axios.get('http://localhost:3001/api/getcomments').then((response) => {
            setCommentsList(response.data)
        });

    }, [])

    const likeIcon = (sentiment) => {
        if (sentiment === 'positive' || sentiment === 'true') {
            return (<FontAwesomeIcon icon="thumbs-up" />)
        }
        else {
            return (<FontAwesomeIcon icon="thumbs-down" />)
        }
    }

    const sortComments = (currentId) => {
        const spComments = [];
        console.log("inside")
        for (var i = 0; i < commentsList.length; i++) {
            console.log(blogList[i])
            if (commentsList[i].blogid === currentId) {
                spComments.push(commentsList[i])
            }
        }

        return spComments
    }

    const displayBlogs = blogList.map((item) => {
        const spComments = sortComments(item.blogid)
        return (
            <div className="blogs">
                <h3>{item.subject}</h3>
                <h4>Created by: {item.created_by}</h4>
                <p>{item.description}</p>
                <p>Tags: {item.tags}</p>
                {spComments.map((item) => {
                    console.log(item)
                    return (
                        <div className="comments">
                            <div className="commentsWrapper">
                                <h4>Posted by: {item.posted_by}</h4>
                                <p>{likeIcon(item.sentiment)} {item.description}</p>
                            </div>
                        </div>
                    )
                })}
                <AddComment blogid={item.blogid}/>
            </div>
        )
    })

    return (
        <div className="commentCont" >
            {displayBlogs}
        </div >
    )
}
