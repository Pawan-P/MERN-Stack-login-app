import React from 'react'

export default function OtpForm(props) {
    return (
        <div className="box2">
            <h2 className="form-h2">Enter OTP: </h2>
            <form onSubmit={props.otpSubmit}>
                <input className="otp-shift" type="number" name="otp" placeholder="OTP Number" required onChange={props.otpHandleChange}/>
                <button type="submit" className="log-in-btn">Login</button>
            </form>
        </div>
    )
}
