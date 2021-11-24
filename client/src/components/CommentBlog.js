import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddComment from './AddComment'
import './CommentBlog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CommentBlog() {

    const [blogList, setBlogList] = useState([])
    // const [commentList, setCommentList] = useState([])
    const [blogid, setBlogId] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:3001/api/getblogs').then((response) => {
            setBlogList(response.data)
            getComments()
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

    // const displayComments = commentList.map((item) => {
    //     return (
    //         <div className="comments">
    //             <h4>Posted by: {item.posted_by}</h4>
    //             {likeIcon(item.sentiment)}
    //             <p>{item.description}</p>
    //         </div>
    //     )
    // })

    const getComments = () => {
        // setTimeout(() => {
        //     axios.post('http://localhost:3001/api/getcomments', {
        //         blogid: blogid
        //     }).then((response) => {
        //         setCommentList(response.data)
        //         // displayComments()
        //     });
        // }, 1000)
        blogList.map(item => {
            console.log(item)
            setBlogId(item.blogid)
            axios.post('http://localhost:3001/api/getcomments', {
                blogid: item.blogid
            }).then((response) => {
                
            });
        })
        // axios.post('http://localhost:3001/api/getcomments', {
        //     blogid: blogid
        // }).then((response) => {
        //     // setCommentList(response.data)
        //     console.log(response)
        // });
    }

    const displayBlogs = blogList.map((item) => {
        return (
            <div className="blogs">
                <h3>{item.subject}</h3>
                <h4>Posted by: {item.created_by}</h4>
                <p>{item.description}</p>
                <p>Tags: {item.tags}</p>
                {/* {displayComments} */}
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
