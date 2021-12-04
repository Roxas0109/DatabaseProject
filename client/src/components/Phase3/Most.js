import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './phase3.css'

export default function Most() {

    const [userList, setUserList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/api/getmostblogs').then(response=>{
            setUserList(response.data)
        })
    }, [])

    const displayUsers = userList.map(item => {
        return (
            <div className="pUsers">
                <h3>{item.created_by}</h3>
            </div>
        )
    })

    return (
        <div className='pCont'>
            <div className="pWrapper">
                <h1>Users with most blogs on: 12/02/2021</h1>
                {displayUsers}
            </div>
        </div>
    )
}
