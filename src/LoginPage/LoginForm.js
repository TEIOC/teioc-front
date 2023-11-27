// LoginForm.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginForm({ onLoginClick }) {
    const handleLoginClick = () => {
        // Logic for handling login
    };

    return (
        <div>
            <h2 className="login-heading">Login</h2>
            <form className="login-form">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <div className="form-footer">
                    <button onClick={onLoginClick} className="login-button">Login</button>
                    <span className="forgot-password-link">Forgot password?</span>
                </div>
            </form>
            <div className="form-separator"></div>
            <div className="register-section">
                Don't have an account? <Link to="/register" className="register-link">Register</Link>
            </div>
        </div>
    );
}

export default LoginForm;



