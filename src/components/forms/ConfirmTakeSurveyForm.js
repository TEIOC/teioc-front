import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmTakeSurveyForm = ({ surveyId }) => {
    const navigate = useNavigate();

    const handleAgree = () => {
        // Handle the "Agree" action here, e.g., navigate to take-assessments
        navigate(`/take-assessment/${surveyId}`);
    };

    const handleRefuse = () => {
        // Handle the "Refuse" action here, e.g., navigate to all assessments
        navigate('/assessments');
    };

    return (
        <div>
            <h2 className="page-title">Confirm Take Survey</h2>
            <p>Do you want to take the survey with ID: {surveyId}?</p>
            <div className="confirmation-buttons">
                <button onClick={handleAgree}>Agree</button>
                <button onClick={handleRefuse}>Refuse</button>
            </div>
        </div>
    );
};

export default ConfirmTakeSurveyForm;
