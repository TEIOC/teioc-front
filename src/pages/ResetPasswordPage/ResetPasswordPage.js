// ResetPasswordPage.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ResetPasswordPage.css';
import { fetchInternById } from '../../api/api';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchInternById(id)
            .then((data) => {
                setEmail(data.email);
            })
            .catch((error) => console.error('Error fetching intern:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification du mot de passe
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;;
        if (!passwordRegex.test(password)) {
            setError(`
            Veuillez entrer un mot de passe valide : 
            - Au moins une lettre majuscule ou minuscule.
            - Au moins un chiffre.
            - La longueur minimale du mot de passe est de 8 caractères.
            `);
            return;
        } else {
            setError('');
        }

        // Vérification du mot de passe
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await api.post('/interns/reset-password', {
                email,
                password,
            });

            console.log('Réinitialisation du mot de passe effectuée :', response.data);

            // Afficher la popup de réussite et rediriger sur login
            setSuccessMessage('Réinitialisation du mot de passe effectuée.');
            setIsSuccessVisible(true);
            setEmail('');
            setError('');

            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 1000);

            setTimeout(() => {
                navigate("/login");
            }, 1100);
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
                <h2 className="login-title">Réinitialiser le mot de passe</h2>
                <form className="form-style" onSubmit={handleSubmit}>
                    <label>
                        Adresse Email :
                        <input type="text" value={email} disabled />
                    </label>
                    <br />
                    <label>
                        Mot de passe :
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Confirmer le mot de passe :
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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

export default ResetPasswordPage;
