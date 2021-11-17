import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <div className="home">
            <h1>Welcome!</h1>
            <button className="btn">Insert Blog</button>
            <button className="btn">Comment on a Blog</button>
            <Link to="/initialize/showdata">
            <button className="btn">Show table</button>
            </Link>
        </div>
    )
}
