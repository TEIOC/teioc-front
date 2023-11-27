// HeaderBanner.js
import React from 'react';
import './HeaderBanner.css';
import { Link } from 'react-router-dom';

function HeaderBanner() {
    return (
        <div className="header-banner">
            <h1>TEIOC - Assessment of Interns Platform</h1>
            <Link to="/login" className="connect-button">Login</Link>
        </div>
    );
}

export default HeaderBanner;


