import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../Navbar'

export default function Register() {
    const history = useHistory();
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        mobile: ""
    });

    function handleInput (event) {
        const {value, name} = event.target
        setUserData({...userData, [name]: value});
        console.log(userData)
    }

    async function registerUser (event) {
        event.preventDefault();
        // CHANGE THE FETCH ADDR
        let result = await fetch("/register", {
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        result = await result.json()
        console.log("Result:", result);
        alert("Registration Successful! Log into your Account Now")
        history.push("/login")
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Fill the form to Register</h2> <br /><br />
                <form onSubmit={registerUser}>
                    <input type="email" value={userData.email} name="email" placeholder="Email Address" required onChange={handleInput}/> <br />
                    <input type="text" value={userData.fName} name="name" placeholder="Your FullName" required onChange={handleInput}/> <br />
                    <input type="tel" value={userData.mobile} name="mobile" placeholder="Mobile number" required onChange={handleInput} maxLength="10"/> <br />
                    <button type="submit" className="btn">Register</button>
                </form>
            </div>
        </div>
    )
}
