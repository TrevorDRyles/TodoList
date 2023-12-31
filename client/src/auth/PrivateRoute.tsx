import React from 'react';
import {Navigate} from 'react-router-dom';
import {useUser} from "./useUser";

export const PrivateRoute = ({children}) => {
    const user = useUser();

    if (!user) return <Navigate to="/signin" replace/>

    return <>{children}</>
}