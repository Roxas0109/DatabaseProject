import './ShowData.css'
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
            <h3>Student Table</h3>
            <table className='stTable'>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Dept. Name</th>
                    <th>Total Credits</th>
                </tr>
                {userList.map((val)=>{
                    return <tr>
                        <td>{val.ID}</td>
                        <td>{val.name}</td>
                        <td>{val.dept_name}</td> 
                        <td>{val.tot_cred}</td>
                    </tr>
                })}
            </table>
        </div>
    )
}

