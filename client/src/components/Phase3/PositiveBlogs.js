import React, { useState } from 'react'
import axios from 'axios'

export default function PositiveBlogs() {

    const [blogList, setBlogList]=useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/getpositiveblogs').then(response=>{
    //         setUserList(response.data)
    //     })
    // }, [])

    return (
        <div className='pCont'>
            <div className="pWrapper">
                <h1>B</h1>
                <h3>Enter usernames:</h3>
                <label> <b>Username 1</b> <input  /></label>
                <label> <b>Username 2</b> <input /></label>
                <button>Find</button>


            </div>
        </div>
    )
}
