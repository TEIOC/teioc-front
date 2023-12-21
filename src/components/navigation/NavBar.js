import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/navbar.css';

function NavBar({ isLoggedIn, onLogout }) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' ||
        location.pathname === '/reset-password' ||
        location.pathname === '/forgot-password' ||
        location.pathname === '/register';

    return (
        <div className="header-banner">
            <img src="./logo_teioc.png" alt="TEIOC Logo" className="header-logo"/>
            <h1 className="header-title">TEIOC - Assessment of Interns Platform</h1>
            {isLoginPage && (
                <Link to="/" className="navbar-button">Home</Link>
            )}
            {!isLoginPage && isLoggedIn && (
                <button onClick={onLogout} className="navbar-button">Logout</button>
            )}
            {!isLoginPage && !isLoggedIn && (
                <Link to="/login" className="navbar-button">Login</Link>
            )}
        </div>
    );
}

export default NavBar;



