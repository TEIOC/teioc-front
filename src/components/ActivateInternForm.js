import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/form.css';
import { activateIntern } from '../api/api';

const ActivateInternPage = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        activateIntern(id)
            .then(() => {
                setSuccessMessage('Your account has been successfully activated.');
            })
            .catch((error) => {
                if (error.response) {
                    setError('Activation error: ' + error.response.data);
                } else if (error.request) {
                    setError('No response from the server');
                } else {
                    setError('Error setting up request: ' + error.message);
                }
            });
    }, [id]);

    return (
        <div className="form-container">
            <div className="form-title">
                <h2>Account Activation</h2>
            </div>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ActivateInternPage;

