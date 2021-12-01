import React, { useState } from 'react'
import axios from 'axios'

export default function Followers() {

    const [userList, setUserList] = useState([])
    const [user1, setUser1] = useState([])
    const [user2, setUser2] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/getnegativecomments').then(response=>{
    //         setUserList(response.data)
    //     })
    // }, [])

    const displayUsers = userList.map(item => {
        return (
            <div className="fUsers">
                <h3>{item.username}</h3>
            </div>
        )
    })

    return (
        <div className='fCont'>
            <div className="fWrapper">
                <h1>Users followed by {user1} and {user2}</h1>
                {displayUsers}
            </div>
        </div>
    )
}
