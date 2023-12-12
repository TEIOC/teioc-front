import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/form.css';
import axiosInstance from '../../services/AxiosInstance';

const RegisterForm = () => {
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
    const navigate = useNavigate();

    // Centralized Axios call for user registration
    const registerUser = async () => {
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

            setTimeout(() => {
                navigate('/login');
            }, 5000);
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
        await registerUser();
    };

    return (
        <div className="form-container">
            <div className="form-title">
                <h2>Register</h2>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div className="error-message">{emailError}</div>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {phoneError && <div className="error-message">{phoneError}</div>}

                <div className="form-footer">
                    <button
                        type="submit"
                        className="button"
                        disabled={isFormSubmitted}
                    >
                        Register
                    </button>
                    <Link to="/login" className="link">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
            {error && <div className="error-message">{error}</div>}
            {isSuccessVisible && <div className="success-popup">{successMessage}</div>}
        </div>
    );
};

export default RegisterForm;


