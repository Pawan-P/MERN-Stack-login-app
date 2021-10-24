import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Joined Us Yet?</h1> <br />
                <h2>No? You my friend are missing Out</h2> <br />
                <Link className="redirect" to="/register">Join NOW</Link>
            </div>        
        </div>
    )
}
