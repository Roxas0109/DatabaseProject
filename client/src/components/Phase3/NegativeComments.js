import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './phase3.css'

export default function NegativeComments() {

    const [userList, setUserList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/api/getUserOnlyNeg').then(response=>{
            setUserList(response.data)
        })
    }, [])

    const displayUsers = userList.map(item => {
        return (
            <div className="pUsers">
                <h3>{item.posted_by}</h3>
            </div>
        )
    })

    return (
        <div className='pCont'>
            <div className="pWrapper">
                <h1>Users who only post negative comments</h1>
                {displayUsers}
            </div>
        </div>
    )
}
