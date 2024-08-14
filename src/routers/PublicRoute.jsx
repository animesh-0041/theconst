// components/PublicRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
    const token = Cookies.get('token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
            // Token is expired
            Cookies.remove('token'); // Optionally remove the expired token
            Cookies.remove('blog_user');
            return false;
        }
        return true; // Token is valid
    } catch (error) {
        // Error decoding token (could be malformed)
        return false;
    }
};

export const PublicRoute = () => {
    return isAuthenticated() ? <Navigate to="/" /> : <Outlet />;
};
