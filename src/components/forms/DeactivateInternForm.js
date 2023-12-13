import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/form.css';
import { deactivateIntern } from '../../services/Api';

const DeactivateInternPage = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        deactivateIntern(id)
            .then(() => {
                setSuccessMessage('Your account has been successfully deactivated.');
                setIsSuccessVisible(true);
                setTimeout(() => {
                    setIsSuccessVisible(false);
                }, 10000);
            })
            .catch((error) => {
                if (error.response) {
                    setError('Deactivation error: ' + error.response.data);
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
                <h2>Account Deactivation</h2>
            </div>
            {error && <div className="error-message">{error}</div>}
            {isSuccessVisible && <div className="success-popup">{successMessage}</div>}
        </div>
    );
};

export default DeactivateInternPage;


