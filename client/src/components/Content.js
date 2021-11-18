import React from 'react'
import { Outlet } from 'react-router-dom'
import './Content.css'

export default function Content() {
    return (
        <div className="contentCont">
            <div className="wrapper">
                <Outlet/>
            </div>

        </div>
    )
}
