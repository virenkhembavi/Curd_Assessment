import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

export default function Navbar() {
    return (
        <div className='HeadWapper'>
            <div className='Middle-Container'>
                <h2>Task</h2>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <p>Home</p>
                </Link>
            </div>
        </div>
    )
}
