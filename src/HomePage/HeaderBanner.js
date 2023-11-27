import React from 'react';
import './HeaderBanner.css';
import { Link } from 'react-router-dom';

function HeaderBanner() {
    const handleConnectClick = () => {
        // Vous pouvez rediriger vers la page de connexion ici
        // Par exemple, si vous utilisez React Router :
        // history.push('/connexion');
    };

    return (
        <div className="header-banner">
            <h1>TEIOC - Assessment of Interns Platform</h1>
            <Link to="/login" className="connect-button">Login</Link>
        </div>
    );
}

export default HeaderBanner;

