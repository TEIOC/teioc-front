import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deactivateIntern, updateLastConnection } from '../../services/Api';
import '../../styles/form.css';

const DeactivateInternPage = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        handleDeactivate(id)
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

    const handleDeactivate = async (id) => {
        try {
            await deactivateIntern(id);
            await updateLastConnection(parseInt(id));
        } catch (error) {
            console.error('Error deactivating account:', error);
            setError('Failed to deactivate account.');
        }
    };

    return (
        <div className="general-form-container">
            <div className="general-form-title">
                <h2>Account Deactivation</h2>
            </div>
            {error && <div className="form-error-message">{error}</div>}
            {isSuccessVisible && <div className="form-success-popup">{successMessage}</div>}
        </div>
    );
};

export default DeactivateInternPage;



