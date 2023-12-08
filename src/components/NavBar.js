import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function NavBar({ isLoggedIn }) {
    return (
        <div className="header-banner">
            <h1>TEIOC - Assessment of Interns Platform</h1>
            {isLoggedIn
                ? <Link to="/logout" className="navbar-button">Logout</Link>
                : <Link to="/login" className="navbar-button">Login</Link>
            }
        </div>
    );
}

export default NavBar;


