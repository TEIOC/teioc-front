import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginForm({ onLoginClick }) {
    const handleLoginClick = (event) => {
        event.preventDefault();
        if (onLoginClick) {
            const email = event.target.email.value;
            const password = event.target.password.value;
            onLoginClick(email, password);
        }
    };

    return (
        <div>
            <div className="header-banner">
                <h1>TEIOC - Assessment of Interns Platform</h1>
            </div>
            <div className="form-container">
                <h2 className="login-title">Login</h2>
                <form className="form-style" onSubmit={handleLoginClick}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                    <div className="form-footer">
                        <button type="submit" className="button-style">Login</button>
                        <Link to="/forgot-password" className="link-style">Forgot password?</Link>
                    </div>
                </form>
                <div className="register-section">
                    Don't have an account? <Link to="/register" className="link-style">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;





