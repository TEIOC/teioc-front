import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCompletedSurveyDetails, fetchSurveyById } from '../../services/Api';
import '../../styles/list.css';

function InternCompletedSurveyDetailsList() {
    const [surveyDetails, setSurveyDetails] = useState([]);
    const [surveyName, setSurveyName] = useState('');
    const { intern_id, survey_id } = useParams();

    useEffect(() => {
        if (intern_id && survey_id) {
            fetchCompletedSurveyDetails(intern_id, survey_id)
                .then(setSurveyDetails)
                .catch(error => console.error('Error fetching survey details:', error));

            fetchSurveyById(survey_id)
                .then(survey => setSurveyName(survey.name))
                .catch(error => console.error('Error fetching survey name:', error));
        }
    }, [intern_id, survey_id]);

    return (
        <div>
            <h2>Survey Details: {surveyName}</h2>
            {surveyDetails.map((detail, index) => (
                <div key={index}>
                    <p className="detail-title">Question: {detail.questionText}</p>
                    <p className="detail-content">
                        Your Answer: {detail.selectedAnswerText}
                        {detail.selectedAnswerText === detail.correctAnswerText ? (
                            <span className="correct-icon">&#10004;</span>
                        ) : (
                            <span className="incorrect-icon">&#10008;</span>
                        )}
                    </p>
                    <p className="detail-content">Correct Answer: {detail.correctAnswerText}</p>
                </div>
            ))}
        </div>
    );
}

export default InternCompletedSurveyDetailsList;





