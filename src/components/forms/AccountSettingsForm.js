import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/list-form.css'; // Ensure this is the correct path to your CSS file
import { updateIntern } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';

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
// TODO DISPLAYING STATUS AND GINIG POSSIBILITY TO ACTIVATE AND DEACTIVATE ACCOUNT + ALL SURVEYS PAGE + pdp +on completed surveys a green tick for right answers

   // TODO results
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

        try {
            const internData = {
                id: intern.id, // Ensure you have the intern's ID
                name: `${firstName} ${lastName}`,
                // email, // Remove this line
                password,
                company,
                contactDetails: phoneNumber
            };

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
        <div className="list-form-container">
            <h2 className="list-form-title">Account Settings</h2>
            <form className="list-form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                {/* Last Name */}
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                {/* Email - Read-Only */}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    readOnly
                />

                {/* Password */}
                <label htmlFor="password">Password (leave blank to keep the same)</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div className="error-message">{passwordError}</div>}

                {/* Company */}
                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                {/* Phone Number */}
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {phoneError && <div className="error-message">{phoneError}</div>}

                {/* Form Footer with Button */}
                <div className="form-footer">
                    <button type="submit" className="list-form-button">Update account</button>
                </div>

                {/* Error and Success Messages */}
                {error && <div className="error-message">{error}</div>}
                {isSuccessVisible && <div className="success-popup">{successMessage}</div>}
            </form>
        </div>
    );
};

export default AccountSettingsForm;



