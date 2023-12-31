import * as React from 'react';
import {useRef, useState} from 'react';
// import styles from './TodoAdd.module.css';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    // refs are used to reference the value of an element
    let username = useRef(null);
    let [password, setPassword] = useState('');
    let [passwordConfirm, setPasswordConfirm] = useState('');
    let [statusMessage, setStatusMessage] = useState('');
    const submitButtonRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let usernameValue = username.current.value;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: usernameValue,
                password: password
            })
        };
        try {
            let response = await fetch('http://localhost:5000/signup', requestOptions);
            // Handle the response here if needed
            if (!response.ok) {
                // Handle error scenarios
                setStatusMessage("Failed to signup:" + response.statusText);
            }else{
                navigate('/home', {state: {username: usernameValue}});
            }
        } catch (error) {
            // Handle fetch errors (e.g., network issues)
            console.error('Error during signup:', error.message);
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
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
                        <input onChange={e => setPassword(e.target.value)} placeholder="password" type="password"
                               className="form-control"
                               id="password"></input>
                    </div>
                    <div className="form-group col-7">
                        <label htmlFor="passwordConfirm">Password Confirm:</label>
                        <input onChange={e => setPasswordConfirm(e.target.value)} placeholder="password" type="password"
                               className="form-control"
                               id="passwordConfirm"></input>
                    </div>
                    <div className={"col-12"}></div>
                    <div className="btn btn-secondary" onClick={() => navigate('/signin')}>Already have an account? Sign
                        In
                    </div>
                    <button disabled={password !== passwordConfirm} type="submit"
                            className="ml-5 btn btn-primary">Submit
                    </button>
                </div>
            </form>
        </div>
    );

}

export default SignUp;
