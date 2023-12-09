// Register.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

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
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
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
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;;
        if (!passwordRegex.test(password)) {
            setEmailError(`
            Veuillez entrer un mot de passe valide : 
            - Au moins une lettre majuscule ou minuscule.
            - Au moins un chiffre.
            - La longueur minimale du mot de passe est de 8 caractères.
            `);
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

            const response = await api.post('/interns', {
                name,
                email: username,
                password,
                company: societe,
                contactDetails: numeroTelephone,
                creationDate: new Date(),
                status: 0,
            });

            console.log('Inscription réussie :', response.data);
            setSuccessMessage('Compte créé avec succès.');
            setIsSuccessVisible(true);
            setError('');

            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 1000);

            if (response.status === 200) {
                const responseMail = await api.post('/email/activate', {
                    email: username,
                });

                console.log('Envoi du mail d\'activation du compte effectuée :', responseMail.data);
                setSuccessMessage('Envoi du mail d\'activation du compte effectuée.');
                setIsSuccessVisible(true);
                setError('');

                setTimeout(() => {
                    setIsSuccessVisible(false);
                }, 1000);
            }

            // Rediriger l'utilisateur vers la page de connexion après une inscription réussie
            setTimeout(() => {
                navigate('/login');
            }, 1500);

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
                {isSuccessVisible && <div className="success-popup show">{successMessage}</div>}
            </div>
        </div>
    );
};

export default RegisterForm;
