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

    const findUser = () => {
        // axios.post('http://localhost:3001/api/getUser', {
        //     user1: user1,
        //     user2: user2,
        // }).then((response) => {
        //     setUserList(response.data)
        // })

        return (
            <div>
                {displayUsers}
            </div>
        )
    }

    return (
        <div className='fCont'>
            <div className="fWrapper">
                <h1>Find user followed by given usernames</h1>
                <h3>Enter usernames:</h3>
                <label> <b>Username 1</b> <input onChange={(e) => setUser1(e.target.value)} /></label>
                <label> <b>Username 2</b> <input onChange={(e) => setUser2(e.target.value)} /></label>
                <button onClick={findUser}>Find User</button>


            </div>
        </div>
    )
}
