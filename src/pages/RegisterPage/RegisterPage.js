// Register.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'; // Réutilisation des mêmes styles que la page de connexion

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const RegisterForm = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [societe, setSociete] = useState('');
    const [numeroTelephone, setNumeroTelephone] = useState('');
    const [error, setError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification du numéro de téléphone
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(numeroTelephone)) {
            setPhoneError('Veuillez entrer un numéro de téléphone valide (10 chiffres).');
            return;
        } else {
            setPhoneError('');
        }

        // Vérification de l'adresse e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            setEmailError('Veuillez entrer une adresse e-mail valide.');
            return;
        } else {
            setEmailError('');
        }

        // Vérification du mot de passe
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            // Concaténer le nom et le prénom
            const name = `${nom} ${prenom}`;

            const response = await api.post('/auth/register', {
                name, // Envoyer le nom concaténé
                email: username,
                password,
                societe,
                numeroTelephone,
            });

            console.log('Inscription réussie :', response.data);

            // Rediriger l'utilisateur vers la page de connexion après une inscription réussie
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setError('Erreur d\'inscription', error.response.data);
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
                <h2 className="login-title">Inscription</h2>
                <form className="form-style" onSubmit={handleSubmit}>
                    <label>
                        Nom :
                        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Prénom :
                        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Adresse Email :
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    {emailError && <div className="error-message">{emailError}</div>}
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
                    <label>
                        Société :
                        <input type="text" value={societe} onChange={(e) => setSociete(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Numéro de téléphone :
                        <input type="text" value={numeroTelephone} onChange={(e) => setNumeroTelephone(e.target.value)} />
                    </label>
                    {phoneError && <div className="error-message">{phoneError}</div>}
                    <br />
                    <div className="form-footer">
                        <button type="submit" className="button-style">S'inscrire</button>
                        <Link to="/login" className="link-style">Vous avez déjà un compte ? Connectez-vous</Link>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default RegisterForm;
