import React from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useHistory } from 'react-router';

export default function Dashboard() {
    const history = useHistory();

    function signOutUser(event){

        const auth = getAuth();        
        const userr = auth.currentUser;
        signOut(auth).then(() => {
            window.alert('User Signed Out');
            console.log("SignedOut")
        }).catch((error) => {
            console.error("Error:", error);
        });
        history.push("/")
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(userr.phoneNumber,", SignedOUT");
                console.log()
            } else {console.log("Error")}
        });
        event.preventDefault()
    }
// Couldn't catch firebase Errors for too-many-requests/otp verified etc.

    return (
        <div>
            <header>
                <button onClick={signOutUser} className="log-in-btn" type="submit">Sign Out</button>
            </header>
            <h1>Logged In</h1>
            <h3>Please stay tuned in for more.</h3>
        </div>
    )
}
