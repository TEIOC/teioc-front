// ActivateInternPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ActivateInternPage.css';
import { activateIntern } from '../../api/api';

const ActivateInternPage = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        activateIntern(id)
            .then(() => {
                setSuccessMessage('Votre compte a été activé avec succès.');
            })
            .catch((error) => {
                if (error.response) {
                    setError('Erreur d\'activation', error.response.data);
                } else if (error.request) {
                    setError('Aucune réponse du serveur');
                } else {
                    setError('Erreur lors de la configuration de la requête : ' + error.message);
                }
            });
    }, [id]);

    return (
        <div>
            {/* Bannière d'en-tête */}
            <div className="header-banner">
                <h1>TEIOC - Plateforme d'évaluation des stagiaires</h1>
            </div>

            {/* Conteneur de formulaire */}
            <div className="form-container">
                <h2 className="login-title">Activation du compte</h2>
                {successMessage && <p>{successMessage}</p>}
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default ActivateInternPage;
