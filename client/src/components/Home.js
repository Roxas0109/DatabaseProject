import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <div className="homeCont">
            <div className="homeWrapper">
                <h1>Welcome!</h1>
                <h3>Phase 1</h3>
                <Link to="initialize">
                    <button className="btn">Init. Student Table</button>
                </Link>

                <h3>Phase 2</h3>
                <Link to="createblog">
                    <button className="btn">Create Blog</button>
                </Link>
                <Link to="commentblog">
                    <button className="btn">Comment on a Blog</button>
                </Link>

                <h3>Phase 3</h3>
                <Link to='positiveblogs'>
                    <button className="btn">Positive Blogs</button>
                </Link>
                <Link to='most'>
                    <button className="btn">Most blogs on 10/10/2021</button>
                </Link>
                <Link to='followers'>
                    <button className="btn">Followers</button>
                </Link>
                <Link to='noblogs'>
                    <button className="btn">Users with no blogs</button>
                </Link>
                <Link to='negativecomments'>
                    <button className="btn">Negative Comments</button>
                </Link>
                <Link to='nonegative'>
                    <button className="btn">Users with no negative comments</button>
                </Link>


            </div>
        </div>
    )
}
