import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSurveyById } from '../../services/Api';
import '../../styles/form.css';

const ConfirmTakeSurveyForm = ({ survey_id }) => {
    const navigate = useNavigate();
    const [survey, setSurvey] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveyData = await fetchSurveyById(survey_id);
                setSurvey(surveyData);
            } catch (error) {
                console.error('Error fetching survey by ID:', error);
            }
        };

        fetchData();
    }, [survey_id]);

    const handleAgree = () => {
        navigate(`/take-assessment/${survey_id}`);
    };

    const handleRefuse = () => {
        navigate('/assessments');
    };

    return (
        <div className="specific-form-container">
            {survey && (
                <div>
                    <h2 className="form-title">
                        Are you ready to take the following assessment:
                    </h2>
                    <h2 className="form-title">{survey.name}?</h2>
                </div>
            )}
            <form className="specific-form-container">
                <div className="form-footer">
                    <button className="form-button" onClick={handleAgree}>
                        Yes
                    </button>
                    <span className="button-space"></span>
                    <button className="form-button" onClick={handleRefuse}>
                        No
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmTakeSurveyForm;



