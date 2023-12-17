import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateIntern } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/form.css';

const AccountSettingsForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const navigate = useNavigate();

    const intern = GetLoggedinIntern();

    useEffect(() => {
        if (intern) {
            const [first, last] = intern.name.split(' ');
            setFirstName(first);
            setLastName(last);
            setEmail(intern.email);
            setCompany(intern.company);
            setPhoneNumber(intern.contactDetails);
        }
    }, [intern]);

    const validateInput = () => {
        let isValid = true;

        const phoneRegex = /^[0-9]{10}$/;
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            setPhoneError('Please enter a valid phone number (10 digits).');
            isValid = false;
        } else {
            setPhoneError('');
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (password && !passwordRegex.test(password)) {
            setPasswordError('Please enter a valid password: At least one letter, one digit, and minimum 8 characters.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }

        const internData = {
            id: intern.id,
            name: `${firstName} ${lastName}`,
            company,
            contactDetails: phoneNumber
        };

        if (password) {
            internData.password = password;
        }

        try {
            await updateIntern(intern.id, internData);
            setSuccessMessage('Account updated successfully.');
            setIsSuccessVisible(true);

            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 3000);
        } catch (error) {
            console.error('Error updating account:', error);
            setError('Failed to update account.');
        }
    };

    return (
        <div className="specific-form-container ">
            <h2 className="specific-form-title">Account Settings</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    className="form-input"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    className="form-input"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    className="form-input form-input-readonly"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    readOnly
                />

                <label htmlFor="password">Password</label>
                <input
                    className="form-input"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div className="form-error-message">{passwordError}</div>}

                <label htmlFor="company">Company</label>
                <input
                    className="form-input"
                    type="text"
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    className="form-input"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {phoneError && <div className="form-error-message">{phoneError}</div>}

                <div className="form-footer">
                    <button type="submit" className="form-button">Update Account</button>
                </div>

                {error && <div className="form-error-message">{error}</div>}
                {isSuccessVisible && <div className="form-success-popup">{successMessage}</div>}
            </form>
        </div>
    );
};

export default AccountSettingsForm;




