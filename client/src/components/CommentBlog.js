import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddComment from './AddComment'
import './CommentBlog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CommentBlog() {

    const [blogList, setBlogList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/api/getblogs').then((response) => {
            setBlogList(response.data)
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

    const displayComments = (blog) => {
        var commentList = [{ posted_by: "test", sentiment: "true", description: "sample desc" }]
        axios.post('http://localhost:3001/api/getcomments', {
            blogid: blog.blogid
        }).then((response) => {
            commentList = response.data
        });

        return (
            <>
                {
                    commentList.map((item) => {
                        console.log("item", item)
                        return (
                            <div className="comments">
                                <div className="commentsWrapper">
                                    <h4>Posted by: {item.posted_by}</h4>
                                    <p>{likeIcon(item.sentiment)} {item.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    const displayBlogs = blogList.map((item) => {
        return (
            <div className="blogs">
                <h3>{item.subject}</h3>
                <h4>Created by: {item.created_by}</h4>
                <p>{item.description}</p>
                <p>Tags: {item.tags}</p>
                {displayComments(item)}
                <AddComment />
            </div>
        )
    })

    return (
        <div className="commentCont" >
            {displayBlogs}


        </div >
    )
}
