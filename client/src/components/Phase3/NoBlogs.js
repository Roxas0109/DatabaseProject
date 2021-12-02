import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './phase3.css'

export default function NoBlogs() {

    const [userList, setUserList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/api/getUserNoBlog').then(response=>{
            setUserList(response.data)
        })
    }, [])

    const displayUsers = userList.map(item => {
        return (
            <div className="pUsers">
                <h3>{item.username}</h3>
            </div>
        )
    })

    return (
        <div className='pCont'>
            <div className="pWrapper">
                <h1>Users with no blogs</h1>
                {displayUsers}
            </div>
        </div>
    )
}
