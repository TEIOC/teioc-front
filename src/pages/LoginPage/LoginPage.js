// LoginPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                email: username,
                password: password,
            });

            // Gérez la réponse de l'API, stockez le jeton, etc.
            console.log('Authentification réussie:', response.data);

            // Redirigez l'utilisateur vers la page souhaitée.
            navigate('/intern-home', { state: { internName: response.data.name } });
        } catch (error) {
            if (error.response) {
                // La requête a été effectuée et le serveur a répondu avec un statut de réponse non 2xx.
                setError('Erreur d\'authentification', error.response.data);
            } else if (error.request) {
                // La requête a été effectuée, mais aucune réponse n'a été reçue.
                setError('Aucune réponse du serveur');
            } else {
                // Une erreur s'est produite lors de la configuration de la requête.
                setError('Erreur lors de la configuration de la requête:', error.message);
            }
        }
    };

    return (
        <div>
            <div className="header-banner">
                <h1>TEIOC - Assessment of Interns Platform</h1>
            </div>
            <div className="form-container">
                <h2 className="login-title">Login</h2>
                <form className="form-style" onSubmit={handleSubmit}>
                    <label>
                        Adresse Mail:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Mot de passe:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <div className="form-footer">
                        <button type="submit" className="button-style">Login</button>
                        <Link to="/forgot-password" className="link-style">Forgot password?</Link>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
                <div className="register-section">
                    Don't have an account? <Link to="/register" className="link-style">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
