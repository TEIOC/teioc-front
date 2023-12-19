import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCompletedSurveyDetails, fetchSurveyById } from '../../services/Api';
import '../../styles/list.css';

function InternCompletedSurveyDetailsList() {
    const [surveyDetails, setSurveyDetails] = useState([]);
    const [surveyName, setSurveyName] = useState('');
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement
    const { intern_id, survey_id } = useParams();

    useEffect(() => {
        if (intern_id && survey_id) {
            Promise.all([
                fetchCompletedSurveyDetails(intern_id, survey_id),
                fetchSurveyById(survey_id),
            ])
                .then(([completedDetails, survey]) => {
                    setSurveyDetails(completedDetails);
                    setSurveyName(survey.name);
                    setLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
                })
                .catch(error => {
                    console.error('Error fetching survey details or survey name:', error);
                    setLoading(false); // Mettre à jour l'état en cas d'erreur
                });
        }
    }, [intern_id, survey_id]);

    return (
        <div>
            <h2 className="page-title">Completed Assessment Details: {surveyName}</h2>
            {loading ? (
                <p className="loading-indicator">Loading...</p> // Afficher un indicateur de chargement en fonction de l'état de chargement
            ) : (
                surveyDetails.map((detail, index) => (
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
                ))
            )}
        </div>
    );
}

export default InternCompletedSurveyDetailsList;






