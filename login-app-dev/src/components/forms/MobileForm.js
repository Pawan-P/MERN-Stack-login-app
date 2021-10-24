import React from 'react'

export default function MobileForm(props) {
    return (
        <div className="box1">
            <h2 className="form-h2">Phone No: </h2>
            <form onSubmit={props.phoneNumberSubmit}>
                <div id="sign-in-button"></div>
                <input type="tel" name="mobile" placeholder="Mobile number" required maxLength="10" onChange={props.formHandleChange}/>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    )
}
