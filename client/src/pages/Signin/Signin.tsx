import * as React from 'react';
import {useRef, useState} from 'react';
// import styles from './TodoAdd.module.css';
import {useNavigate} from 'react-router-dom';
import {useToken} from "../../auth/useToken"

const SignIn = () => {
    const navigate = useNavigate();
    // refs are used to reference the value of an element
    const username = useRef(null);
    const password = useRef(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [token, setToken] = useToken();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let usernameValue = username.current.value;
        let passwordValue = password.current.value;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: usernameValue,
                password: passwordValue,
            })
        };
        try {
            let response = await fetch('http://localhost:5000/signin', requestOptions);
            // Handle the response here if needed
            if (!response.ok) {
                // Handle error scenarios
                setStatusMessage("Failed to SignIn: " + response.statusText);
            } else {
                const {token} = await response.json();
                // @ts-ignore
                setToken(token);
                navigate('/home', {state: {username: usernameValue}});
            }
        } catch (error) {
            // Handle fetch errors (e.g., network issues)
            console.error('Error during SignIn:', error.message);
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            <h2 id={"statusMessage"}>{statusMessage}</h2>
            <form onSubmit={handleSubmit}>
                <div className={"row mt-5 ml-5"}>
                    <div className="form-group col-7">
                        <label htmlFor="username">Username:</label>
                        <input placeholder="username" ref={username} type="text" className="form-control"
                               id="username"></input>
                    </div>
                    <div className="form-group col-7">
                        <label htmlFor="password">Password:</label>
                        <input placeholder="password" ref={password} type="password" className="form-control"
                               id="password"></input>
                    </div>
                    <div className={"col-12"}></div>
                    {/*<div className="ml-5 btn btn-secondary" onClick={() => alert('not implemented')}>Forgot your*/}
                    {/*    password?*/}
                    {/*</div>*/}
                    <div className="ml-5 btn btn-secondary" onClick={() => navigate('/signup')}>Don't have an account?
                        Sign Up
                    </div>
                    <button type="submit" className="ml-5 btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );

}

export default SignIn;
