import React, { useState } from 'react'
import axios from 'axios'

export default function NegativeComments() {

    const [userList, setUserList] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/getnegativecomments').then(response=>{
    //         setUserList(response.data)
    //     })
    // }, [])

    const displayUsers = userList.map(item => {
        return (
            <div className="negUsers">
                <h3>{item.username}</h3>
            </div>
        )
    })

    return (
        <div className='negCont'>
            <div className="negWrapper">
                <h1>Users with only negative comments</h1>
                {displayUsers}
            </div>
        </div>
    )
}
