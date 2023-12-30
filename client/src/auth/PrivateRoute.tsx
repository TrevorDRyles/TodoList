import React from 'react';
import {Navigate} from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const user = null;

    if (!user) return <Navigate to="/signin" replace/>

    return <>{children}</>
}