import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/form.css'


const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Your code to fetch email based on ID
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(`
            Please enter a valid password:
            - At least one uppercase or lowercase letter.
            - At least one digit.
            - Minimum password length is 8 characters.
            `);
            return;
        } else {
            setError('');
        }

        // Password confirmation
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await api.post('/interns/reset-password', {
                email,
                password,
            });

            console.log('Password reset successful:', response.data);

            // Show success popup and redirect to login
            setSuccessMessage('Password reset successful.');
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
                <h2 className="form-title">Reset Password</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" value={email} disabled />
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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

export default ResetPasswordForm;

