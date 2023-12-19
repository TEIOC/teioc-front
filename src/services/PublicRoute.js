import React from 'react';
import { useLocation } from 'react-router-dom';
import { logout, isTokenValid } from './AuthService.js'; // import the utility function

const PublicRoute = ({ children }) => {
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
    }

    return children;
};


export default PublicRoute;