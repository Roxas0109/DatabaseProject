import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowData() {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/get').then((response)=>{
            setUserList(response.data)
        });
    }, [])

    return (
        <div>
            <h3>Current Users</h3>
            {userList.map((val)=>{
                return <h4>{val.username}, {val.password}, {val.firstName}, {val.lastName}, {val.email}</h4>
            })}
        </div>
    )
}

