import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header>
            <Link className="header-links" to="/">Home </Link>
            <Link className="header-links" to="/register">Register</Link>
            <Link className="header-links" to="/login">Login</Link>
        </header>
    )
}
