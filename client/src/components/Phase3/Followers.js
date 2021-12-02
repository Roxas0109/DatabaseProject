import React, { useState } from 'react'
import axios from 'axios'

export default function Followers() {

    const [userList, setUserList] = useState([])
    const [user1, setUser1] = useState([])
    const [user2, setUser2] = useState([])

    const findUser = async () => {
        await axios.post('http://localhost:3001/api/getFollowed', {
            user1: user1,
            user2: user2,
        }).then((response) => {
            setUserList(response.data)
        })
    }

    const displayUsers = userList.map(item => {
        return (
            <div className="pUsers">
                <h3>{item.leadername}</h3>
            </div>
        )
    })

    return (
        <div className='pbCont'>
            <div className="pbWrapper">
                <h1>Find user followed by given usernames</h1>
                <h3>Enter usernames:</h3>
                <label> <b>Username 1</b> <input onChange={(e) => setUser1(e.target.value)} /></label>
                <label> <b>Username 2</b> <input onChange={(e) => setUser2(e.target.value)} /></label>
                <button className="btn" onClick={findUser}>Find User</button>
                {displayUsers}


            </div>
        </div>
    )
}
