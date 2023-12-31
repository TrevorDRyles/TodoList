import {useEffect, useState} from 'react';
import {useToken} from './useToken';

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        // middle part of payload contains encoded information about the user
        const encodedPayload = token.split('.')[1];
        // decode the info about the use
        return JSON.parse(atob(encodedPayload));
    }

    const [user, setUser] = useState(() => {
        // user is null if there's no token for a user
        if (!token) return null;
        // otherwise set the user equal to the decoded information about the user
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        // on initial load and every time token changes, call this effect

        // if there's no token, there's no user
        if (!token) {
            setUser(null);
        } else {
            // when token changes, set user to the information from the token
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
}