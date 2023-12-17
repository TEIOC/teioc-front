import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/form.css'; // Use the same CSS file as LoginForm, ForgotPasswordForm, and RegisterForm
import { fetchInternById } from '../../services/Api';
import axiosInstance from '../../services/AxiosInstance';

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
        fetchInternById(id)
            .then((data) => {
                setEmail(data.email);
            })
            .catch((error) => console.error('Error fetching intern:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axiosInstance.post('/email/reset-password', {
                email,
                password,
            });

            console.log('Password reset successful:', response.data);

            setSuccessMessage('Password reset successful.');
            setIsSuccessVisible(true);
            setEmail('');
            setError('');

            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 10000);

            setTimeout(() => {
                navigate('/login');
            }, 1500);
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
            <h2 className="general-form-title">Reset Password</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    className="form-input"
                    value={email}
                    disabled
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="form-footer">
                    <button
                        type="submit"
                        className="form-button"
                    >
                        Reset Password
                    </button>
                    <Link to="/login" className="form-link">
                        Back to login page
                    </Link>
                </div>
            </form>
            {error && <div className="form-error-message">{error}</div>}
            {isSuccessVisible && <div className="form-success-popup show">{successMessage}</div>}
        </div>
    );
};

export default ResetPasswordForm;




