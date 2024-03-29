import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { logout, isTokenValid } from './AuthService.js'; // import the utility function

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const location = useLocation();

    React.useEffect(() => {
        const checkAuth = async () => {
            const isValid = await isTokenValid();
            setIsAuthenticated(isValid);
        };
        checkAuth();
    }, [location]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // or some loading indicator
    }

    if (!isAuthenticated) {
        logout();
        return <Navigate to="/login" />;
    }

    return children;
};


export default ProtectedRoute;
