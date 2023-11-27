import React from 'react';
import './LoginPage.css'; // Importez le fichier CSS de style

function LoginPage() {
    const handleLoginClick = () => {
        // Vous pouvez ajouter la logique de connexion ici
    };

    return (
        <div className="login-page"> {/* Utilisez la classe CSS pour appliquer le style */}
            <h2>Login</h2>
            <form className="login-form">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <button onClick={handleLoginClick} className="login-button">Login</button>

                <div className="options">
                    <button className="register-button">Register</button>
                    <span className="forgot-password-link">Forgot Password?</span>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
