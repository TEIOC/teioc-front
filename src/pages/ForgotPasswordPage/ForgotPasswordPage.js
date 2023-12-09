// ForgotPasswordPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPasswordPage.css';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/email/reset-password', {
                email,
            });

            console.log('Demande de réinitialisation de mot de passe réussie :', response.data);

            // Afficher la popup de réussite et réinitialiser le formulaire
            setSuccessMessage('Demande de réinitialisation de mot de passe réussie. Veuillez vérifier votre e-mail.');
            setIsSuccessVisible(true);
            setEmail('');
            setError('');

            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 5000);

        } catch (error) {
            if (error.response) {
                setError('Erreur lors de la demande de réinitialisation de mot de passe', error.response.data);
            } else if (error.request) {
                setError('Aucune réponse du serveur');
            } else {
                setError('Erreur lors de la configuration de la requête :', error.message);
            }
        }
    };

    return (
        <div>
            {/* Bannière d'en-tête */}
            <div className="header-banner">
                <h1>TEIOC - Plateforme d'évaluation des stagiaires</h1>
            </div>

            {/* Conteneur de formulaire */}
            <div className="form-container">
                <h2 className="login-title">Mot de passe oublié</h2>
                <form className="form-style" onSubmit={handleSubmit}>
                    <label>
                        Adresse Email :
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <br />
                    <div className="form-footer">
                        <button type="submit" className="button-style">Réinitialiser le mot de passe</button>
                        <Link to="/login" className="link-style">Retour à la page de connexion</Link>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
                {isSuccessVisible && <div className="success-popup show">{successMessage}</div>}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
