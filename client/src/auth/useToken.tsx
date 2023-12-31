import {useState} from 'react'

export const useToken = () => {
    // token is the internal representation of the token which is stored in the user's web browser
    // setTokenInternal sets the internal representation of the token
    // set the default value equal to the browser's token if it exists, or blank/null otherwise
    // pass in a function to compute the initial value of token
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    });

    // setToken sets the token stored in the browser directly
    // it also updates the internal representation of this token
    const setToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    }
    // export the token itself and the function for setting the external/internal tokens
    return [token, setToken];
}