import React, { useState } from 'react'
import axios from 'axios'

export default function NoBlogs() {

    const [userList, setUserList] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/getnoblogs').then(response=>{
    //         setUserList(response.data)
    //     })
    // }, [])

    const displayUsers = userList.map(item => {
        return (
            <div className="nobUsers">
                <h3>{item.username}</h3>
            </div>
        )
    })

    return (
        <div className='nobCont'>
            <div className="nobWrapper">
                <h1>Users with no blogs</h1>
                {displayUsers}
            </div>
        </div>
    )
}
