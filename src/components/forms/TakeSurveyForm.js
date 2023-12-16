import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchQuestionsAndAnswersForSurvey,
    saveInternAnswers,
    createPathway,
    updatePathwayScore
} from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/take-survey-form.css';

const TakeSurveyForm = () => {
    const { survey_id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [startTime, setStartTime] = useState(null);
    const intern = GetLoggedinIntern(); // Assuming this function returns the logged-in intern's data

    useEffect(() => {
        fetchQuestionsAndAnswersForSurvey(survey_id)
            .then((questionsData) => {
                setQuestions(questionsData);
                setStartTime(Date.now()); // Set the start time when questions are loaded
            })
            .catch((error) => {
                console.error('Error fetching questions and answers:', error);
            });
    }, [survey_id]);

    const handleSelectAnswer = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId,
        });
    };

    const calculateDuration = (start) => {
        const endTime = Date.now();
        const durationInMilliseconds = endTime - start;
        const hours = Math.floor(durationInMilliseconds / 3600000);
        const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((durationInMilliseconds % 60000) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSubmitSurvey = async () => {
        try {
            const duration = calculateDuration(startTime);
            await createPathway(intern.id, survey_id, duration);

            const answers = Object.entries(selectedAnswers).map(([questionId, answerId]) => ({
                intern_id: intern.id,
                survey_id: survey_id,
                answer_id: answerId,
            }));

            await saveInternAnswers(answers);
            await updatePathwayScore(intern.id, survey_id);
            navigate('/completed-assessments');
        } catch (error) {
            console.error('Error submitting survey:', error);
        }
    };

    const renderQuestions = () => {
        return questions.map((question) => (
            <div key={question.id} className="survey-question">
                <label>{question.label}</label>
                <ul className="answer-list">
                    {question.answers.map((answer) => (
                        <li key={answer.id} className="answer-item">
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={answer.id}
                                id={`answer-${answer.id}`}
                                checked={selectedAnswers[question.id] === answer.id}
                                onChange={() => handleSelectAnswer(question.id, answer.id)}
                            />
                            <label htmlFor={`answer-${answer.id}`}>{answer.label}</label>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className="take-survey-container">
            <h2 className="take-survey-title">Take Survey: {survey_id}</h2>
            <form onSubmit={handleSubmitSurvey}>
                {renderQuestions()}
                <div className="survey-footer">
                    <button type="submit" className="survey-button">Submit</button>
                    <button type="button" onClick={() => navigate('/available-assessments')} className="survey-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default TakeSurveyForm;




