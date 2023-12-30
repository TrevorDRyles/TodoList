import * as React from 'react';
import {Fragment, useRef, useState} from "react";
// import styles from './TodoAdd.module.css';

function SignUp() {
    // refs are used to reference the value of an element
    const username = useRef(null);
    const password = useRef(null);
    const passwordConfirm = useRef(null);
    const [statusMessage, setStatusMessage] = useState('');


    const handleSubmit = async () => {
        let descript = username.current.value;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({description: descript})
        };
        try {
            let response = await fetch('http://localhost:5000/signup', requestOptions);
            // Handle the response here if needed
            if (!response.ok) {
                // Handle error scenarios
                console.error('Failed to signup:', response.statusText);
            }else{
                setStatusMessage("user created");
            }
        } catch (error) {
            // Handle fetch errors (e.g., network issues)
            console.error('Error during signup:', error.message);
        }
    }

    return (
        <Fragment>
            <h1 id={"statusMessage"}>{statusMessage}</h1>
            <form onSubmit={handleSubmit}>
                <div className={"row mt-5 ml-5"}>
                    <div className="form-group col-7">
                        <label htmlFor="username">Username:</label>
                        <input ref={username} type="text" className="form-control" id="username"></input>
                    </div>
                    <div className="form-group col-7">
                        <label htmlFor="password">Password:</label>
                        <input ref={password} type="text" className="form-control" id="password"></input>
                    </div>
                    <div className="form-group col-7">
                        <label htmlFor="passwordConfirm">Password Confirm:</label>
                        <input ref={passwordConfirm} type="text" className="form-control" id="passwordConfirm"></input>
                    </div>
                    <div className={"col-12"}></div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </Fragment>
    );

}

export default SignUp;
