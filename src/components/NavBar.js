import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

function NavBar({ isLoggedIn, onLogout }) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div style={{ backgroundColor: '#007bff', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px' }}>
            <h1>TEIOC - Assessment of Interns Platform</h1>
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



