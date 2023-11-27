import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            onLoginSuccess(data); // Callback function to handle the successful login
        } catch (err) {
            setError(err.message); // Handle and display errors
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
                    <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />

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
}

export default LoginForm;





