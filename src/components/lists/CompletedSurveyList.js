import React, { useState, useEffect } from 'react';
import { fetchPathwaysForIntern, fetchSurveys, fetchTopics, fetchCompletedSurveyDetails } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/list.css';

function CompletedSurveyList() {
    const [pathways, setPathways] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [topics, setTopics] = useState([]);
    const [expandedSurveyId, setExpandedSurveyId] = useState(null);
    const [surveyDetails, setSurveyDetails] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const intern = GetLoggedinIntern();

    useEffect(() => {
        if (intern && intern.id) {
            fetchPathwaysForIntern(intern.id)
                .then(setPathways)
                .catch(error => console.error('Error fetching pathways:', error));

            Promise.all([fetchSurveys(), fetchTopics()])
                .then(([surveyData, topicData]) => {
                    setSurveys(surveyData);
                    setTopics(topicData);
                })
                .catch(error => console.error('Error fetching surveys or topics:', error));
        }
    }, [intern]);

    const renderAnswerIcon = (detail) => {
        if (detail.selectedAnswerText === detail.correctAnswerText) {
            return <span className="correct-icon">&#10004;</span>; // Unicode for check mark
        } else {
            return <span className="incorrect-icon">&#10008;</span>; // Unicode for cross mark
        }
    };

    const toggleDetails = async (survey_id) => {
        if (expandedSurveyId === survey_id) {
            setExpandedSurveyId(null);
        } else {
            setExpandedSurveyId(survey_id);
            setLoadingDetails(true);
            try {
                const details = await fetchCompletedSurveyDetails(intern.id, survey_id);
                setSurveyDetails(details);
            } catch (error) {
                console.error('Error fetching survey details:', error);
            } finally {
                setLoadingDetails(false);
            }
        }
    };

    return (
        <div className="container">
            <h2 className="page-title">Completed Assessments</h2>
            <ul className="list">
                {pathways.map((pathway, index) => {
                    const survey = surveys.find(s => s.id === pathway.survey_id);
                    return (
                        <li key={index} className="item">
                            <div className="item-header">
                                <strong>{survey ? survey.name : 'Unknown Survey'}</strong>
                                <div>
                                    <p>Score: {pathway.score}</p>
                                    <p>Duration: {pathway.duration}</p>
                                    <button className="toggle-button" onClick={() => toggleDetails(pathway.survey_id)}>
                                        {expandedSurveyId === pathway.survey_id ? 'Hide Details' : 'Show Details'}
                                    </button>
                                </div>
                            </div>
                            {expandedSurveyId === pathway.survey_id && (
                                <div className="details">
                                    {loadingDetails ? <p>Loading details...</p> : (
                                        surveyDetails.map((detail, detailIndex) => (
                                            <div key={detailIndex} className="detail-item">
                                                <p className="detail-title">Question: {detail.questionText}</p>
                                                <p className="detail-content">
                                                    Your Answer: {detail.selectedAnswerText}
                                                    {renderAnswerIcon(detail)}
                                                </p>
                                                <p className="detail-content">Correct Answer: {detail.correctAnswerText}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CompletedSurveyList;




