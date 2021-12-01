import React, { useState } from 'react'
import axios from 'axios'

export default function Most() {

    const [userList, setUserList] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/getmostblogs').then(response=>{
    //         setUserList(response.data)
    //     })
    // }, [])

    const displayUsers = userList.map(item => {
        return (
            <div className="mUsers">
                <h3>{item.username}</h3>
            </div>
        )
    })

    return (
        <div className='mCont'>
            <div className="mWrapper">
                <h1>Users with most blogs on: 10/10/2021</h1>
                {displayUsers}
            </div>
        </div>
    )
}
