import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/form.css';
import { fetchSurveyById } from '../../services/Api';

const ConfirmTakeSurveyForm = ({ survey_id }) => {
    const navigate = useNavigate();
    const [survey, setSurvey] = useState(null);

    useEffect(() => {
        // Fetch the survey by ID when the component mounts
        fetchSurveyById(survey_id)
            .then((surveyData) => {
                setSurvey(surveyData);
            })
            .catch((error) => {
                console.error('Error fetching survey by ID:', error);
            });
    }, [survey_id]);

    const handleAgree = () => {
        // Handle the "Agree" action here, e.g., navigate to take-assessments
        navigate(`/take-assessment/${survey_id}`);
    };

    const handleRefuse = () => {
        // Handle the "Refuse" action here, e.g., navigate to all assessments
        navigate('/assessments');
    };

    return (
        <div className="form-container">
            {survey && (
                <div>
                    <h2 className="form-title">
                        Are you ready to take the following assessment :
                    </h2>
                    <h2 className="form-title">
                        {survey.name}?
                    </h2>
                </div>
            )}
            <form className="form">
                <div className="form-footer">
                    <button className="button" onClick={handleAgree}>Yes</button>
                    <span className="button-space"></span>
                    <button className="button" onClick={handleRefuse}>No</button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmTakeSurveyForm;


