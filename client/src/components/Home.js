import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <div className="home">
            <h1>Welcome!</h1>
            <Link to="/initialize/createblog">
                <button className="btn">Create Blog</button>
            </Link>
            <button className="btn">Comment on a Blog</button>
            <Link to="/initialize/showdata">
                <button className="btn">Show table</button>
            </Link>
        </div>
    )
}
