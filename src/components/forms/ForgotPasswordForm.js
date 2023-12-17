import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/form.css';
import AxiosInstance from '../../services/AxiosInstance';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AxiosInstance.post('/email/reset-password', {
                email,
            });

            console.log('Password reset request successful:', response.data);

            setSuccessMessage('Password reset request successful. Please check your email.');
            setIsSuccessVisible(true);
            setEmail('');
            setError('');

            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 10000);

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
        <div className="general-form-container">
            <h2 className="form-title">Forgot Password</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    className="form-input"
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="form-footer">
                    <button type="submit" className="form-button">
                        Reset Password
                    </button>
                    <Link to="/login" className="form-link">
                        Back to login page
                    </Link>
                </div>
            </form>
            {error && <div className="form-error-message">{error}</div>}
            {isSuccessVisible && <div className="form-success-popup">{successMessage}</div>}
        </div>
    );
};

export default ForgotPasswordForm;


