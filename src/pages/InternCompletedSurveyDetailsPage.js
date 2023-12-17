import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCompletedSurveyDetails } from '../services/Api';

function InternCompletedSurveyDetailsPage() {
    const [surveyDetails, setSurveyDetails] = useState([]);
    const { intern_id, survey_id } = useParams();

    useEffect(() => {
        if (intern_id && survey_id) {
            fetchCompletedSurveyDetails(intern_id, survey_id)
                .then(setSurveyDetails)
                .catch(error => console.error('Error fetching survey details:', error));
        }
    }, [intern_id, survey_id]);

    return (
        <div>
            <h2>Survey Details</h2>
            {surveyDetails.map((detail, index) => (
                <div key={index}>
                    <p>Question: {detail.questionText}</p>
                    <p>Your Answer: {detail.selectedAnswerText}</p>
                    <p>Correct Answer: {detail.correctAnswerText}</p>
                </div>
            ))}
        </div>
    );
}

export default InternCompletedSurveyDetailsPage;
