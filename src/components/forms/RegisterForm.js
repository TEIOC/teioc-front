import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/form.css'; // Use the same CSS file as LoginForm and ForgotPasswordForm
import axiosInstance from '../../services/AxiosInstance';

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [company, setCompany] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormSubmitted) {
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setPhoneError('Please enter a valid phone number (10 digits).');
            return;
        } else {
            setPhoneError('');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(`
            Please enter a valid password: 
            - At least one uppercase or lowercase letter.
            - At least one digit.
            - The minimum password length is 8 characters.
            `);
            return;
        } else {
            setError('');
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Centralized Axios call for user registration
        try {
            const name = `${firstName} ${lastName}`;

            const response = await axiosInstance.post('/interns', {
                name,
                email,
                password,
                company,
                contactDetails: phoneNumber,
                creationDate: new Date(),
                status: 0,
            });

            console.log('Registration successful:', response.data);
            setSuccessMessage('Account created successfully.');
            setIsSuccessVisible(true);
            setError('');
            setIsFormSubmitted(true);

            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 10000);

            if (response.status === 200) {
                const responseMail = await axiosInstance.post('/email/activate', {
                    email,
                });

                console.log('Account activation email sent:', responseMail.data);
                setSuccessMessage('Account activation email sent.');

                setTimeout(() => {
                    setIsSuccessVisible(false);
                }, 10000);
            }
        } catch (error) {
            if (error.response) {
                setError('Registration error', error.response.data);
            } else if (error.request) {
                setError('No response from server');
            } else {
                setError('Error during request setup:', error.message);
            }
        }
    };

    return (
        <div className="general-form-container">
            <h2 className="form-title">Register</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    className="form-input"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    className="form-input"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    className="form-input"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div className="error-message">{emailError}</div>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-input"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    className="form-input"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    className="form-input"
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    className="form-input"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {phoneError && <div className="error-message">{phoneError}</div>}

                <div className="form-footer">
                    <button
                        type="submit"
                        className="form-button"
                        disabled={isFormSubmitted}
                    >
                        Register
                    </button>
                    <Link to="/login" className="form-link">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
            {error && <div className="form-error-message">{error}</div>}
            {isSuccessVisible && <div className="form-success-popup">{successMessage}</div>}
        </div>
    );
}

export default RegisterForm;



