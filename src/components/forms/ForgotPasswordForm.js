import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/form.css'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const ForgotPasswordForm = () => {
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

            console.log('Password reset request successful:', response.data);

            setSuccessMessage('Password reset request successful. Please check your email.');
            setIsSuccessVisible(true);
            setEmail('');
            setError('');

            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 1000);

        } catch (error) {
            if (error.response) {
                setError('Error requesting password reset', error.response.data);
            } else if (error.request) {
                setError('No response from the server');
            } else {
                setError('Request configuration error:', error.message);
            }
        }
    };

    return (
        <div className="form-container">
            <div className="form-title">
                <h2>Forgot Password</h2>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="form-footer">
                    <button type="submit" className="button">
                        Reset password
                    </button>
                    <Link to="/login" className="link">
                        Back to login page
                    </Link>
                </div>
            </form>
            {error && <div className="error-message">{error}</div>}
            {isSuccessVisible && <div className="success-popup show">{successMessage}</div>}
        </div>
    );
};

export default ForgotPasswordForm;

