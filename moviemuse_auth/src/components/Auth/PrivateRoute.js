import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    try {
        // Decode the token to check its expiration
        const decodedToken = jwtDecode(accessToken);

        // If token is expired, redirect to login
        if (decodedToken.exp * 1000 < Date.now()) {
            return <Navigate to="/login" />;
        }
    } catch (error) {
        // If decoding fails, also redirect to login
        return <Navigate to="/login" />;
    }

    // Token is valid, allow access to the dashboard
    return children;
};

export default PrivateRoute;
