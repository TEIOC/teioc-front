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
            <h1>TEIOC - Évaluation des Stagiaires</h1>
            <button onClick={handleConnectClick} className="connect-button">
                Se connecter
            </button>
            {/* Utilisez Link si vous utilisez React Router */}
            {/* <Link to="/connexion" className="connect-button">
          Se connecter
        </Link> */}
        </div>
    );
}

export default HeaderBanner;

