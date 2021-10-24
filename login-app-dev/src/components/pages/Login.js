import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import 'firebase/auth'

import Navbar from '../Navbar';
import firebaseConfig from '../firebase';
import MobileForm from '../forms/MobileForm';
import OtpForm from '../forms/OtpForm';
import { useHistory } from 'react-router';


// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();


export default function Login() {
  
    const history = useHistory();
    const [name, setState] = useState("")
    // called for input change
    function handleChange(event){
      setState(event.target.value)
    }
    // called for Recaptcha.
    function configureCaptcha(){      
      window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          this.onSignInSubmit();
          console.log("Recapcha verified")
        }        
      }, auth);
    }
    // Called for Number Verification
    async function onSignInSubmit(event){
      event.preventDefault()
      configureCaptcha()
      const mobile = "+91" + name;
      console.log(mobile, "Entered by User")
      const appVerifier = window.recaptchaVerifier;

      const userMob = { mobile: name }
      let result = await fetch("/login", {
        method: 'POST',
        body: JSON.stringify(userMob),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
      result = await result.json()
      console.log("Result:", result);
      if( result.error === "User not Registered! Please Register"){
        return history.push("/register")
      } else signInWithPhoneNumber(auth, mobile, appVerifier)
          .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            alert("Please Enter the sent OTP")
          }).catch(error => {
            console.error(error)
            history.go(0)
          });
    }
    // called after cubmitting OTP
    function onSubmitOTP(event){
      event.preventDefault()
      const code = name
      console.log(code)
      window.confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user.mobile))
        alert("OTP verified, Now Logged In")
        history.push("/dashboard")
      }).catch((error) => {
        console.error("OTP not verified", error)
      });
    }
    return (
        <div>
          <Navbar />
          <div className="container">
              <h2>Log into your Account</h2> <br /><br />
              <MobileForm phoneNumberSubmit={onSignInSubmit} formHandleChange={handleChange} />
              <OtpForm otpSubmit={onSubmitOTP} otpHandleChange={handleChange} />
          </div>
        </div>
    )
}