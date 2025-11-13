import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

// A simple loading spinner component (we'll create it next)
const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (user) {
        return children;
    }

    // Redirect to login, but save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;