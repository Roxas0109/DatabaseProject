import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <div className="homeCont">
            <div className="homeWrapper">
                <h1>Welcome!</h1>
                <Link to="createblog">
                    <button className="btn">Create Blog</button>
                </Link>
                <Link to="commentblog">
                    <button className="btn">Comment on a Blog</button>
                </Link>
                <Link to="initialize">
                    <button className="btn">Init. Student Table</button>
                </Link>
            </div>
        </div>
    )
}
