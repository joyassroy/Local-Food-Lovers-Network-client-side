import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <img 
                src="https://i.ibb.co.com/6JJ3Wj7J/a104.jpg" 
                alt="404 Error" 
                className="max-w-md w-full"
            />
            <h1 className="text-4xl font-bold mt-8">Page Not Found</h1>
            <p className="text-lg text-gray-600 mt-2">
                {error.statusText || error.message || "We can't seem to find the page you're looking for."}
            </p>
            <Link to="/" className="btn btn-primary mt-8">
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;