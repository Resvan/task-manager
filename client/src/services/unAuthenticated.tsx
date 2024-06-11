import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UnAuthenticated: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const token = useSelector((state: any) => state.auth.isAuthenticated);


    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default UnAuthenticated;
