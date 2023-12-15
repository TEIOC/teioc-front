import React from 'react';
import {useParams} from "react-router-dom";

function ConfirmTakeSurveyPage() {
    const { survey_id } = useParams();
    return (
        <div>
            {/* Display confirmation message and use the surveyId as needed */}
            <p>Confirm taking survey with ID: {survey_id}</p>
            {/* Add your confirmation UI and logic here */}
        </div>
    );
}

export default ConfirmTakeSurveyPage;
