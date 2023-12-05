// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function NavBar() {
    return (
        <div className="header-banner">
            <h1>TEIOC - Assessment of Interns Platform</h1>
            <Link to="/login" className="navbar-button">Login</Link>
        </div>
    );
}

export default NavBar;


