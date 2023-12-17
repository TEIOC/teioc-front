import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { activateIntern } from '../../services/Api';
import '../../styles/form.css';

const ActivateInternPage = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        activateIntern(id)
            .then(() => {
                setSuccessMessage('Your account has been successfully activated.');
                setIsSuccessVisible(true);
                setTimeout(() => {
                    setIsSuccessVisible(false);
                }, 10000);
            })
            .catch(error => {
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
        <div className="general-form-container">
            <div className="general-form-title">
                <h2>Account Activation</h2>
            </div>

            {error && <div className="form-error-message">{error}</div>}
            {isSuccessVisible && <div className="form-success-popup">{successMessage}</div>}
        </div>
    );
};

export default ActivateInternPage;



