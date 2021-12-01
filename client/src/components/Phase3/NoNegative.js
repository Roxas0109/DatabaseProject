import React, { useState } from 'react'
import axios from 'axios'

export default function NoNegative() {

    const [userList, setUserList] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/getpositive').then(response=>{
    //         setUserList(response.data)
    //     })
    // }, [])

    const displayUsers = userList.map(item => {
        return (
            <div className="noUsers">
                <h3>{item.username}</h3>
            </div>
        )
    })

    return (
        <div className='noCont'>
            <div className="noWrapper">
                <h1>Users with no negative comments on their blogs</h1>
                {displayUsers}
            </div>
        </div>
    )
}
