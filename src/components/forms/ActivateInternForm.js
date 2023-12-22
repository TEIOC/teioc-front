import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { activateIntern, updateLastConnection } from '../../services/Api';
import '../../styles/form.css';

const ActivateInternPage = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        handleActivate(id);
    }, [id]);

    const handleActivate = async (id) => {
        try {
            await activateIntern(id);
            await updateLastConnection(parseInt(id));
            setSuccessMessage('Your account has been successfully activated.');
            setIsSuccessVisible(true);
            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 10000);
        } catch (error) {
            console.error('Error activating account:', error);
            setError('Failed to activate account.');
        }
    };

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




