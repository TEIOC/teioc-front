import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSurveyById, fetchQuestionsAndAnswersForSurvey, saveInternAnswers, createPathway, updatePathwayScore } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/form.css';

const TakeSurveyForm = () => {
    const { survey_id } = useParams();
    const navigate = useNavigate();
    const [survey, setSurvey] = useState({});
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const intern = GetLoggedinIntern();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveyData = await fetchSurveyById(survey_id);
                const questionsData = await fetchQuestionsAndAnswersForSurvey(survey_id);
                setSurvey(surveyData);
                setQuestions(questionsData);
                setStartTime(Date.now());
                setLoading(false); // Update loading to false when data fetching is complete
            } catch (error) {
                console.error('Error fetching survey or questions:', error);
                setLoading(false); // Make sure to update loading in case of an error
            }
        };

        fetchData();
    }, [survey_id]);

    const handleSelectAnswer = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId,
        });
    };

    const areAllQuestionsAnswered = () => {
        return questions.every(question => selectedAnswers.hasOwnProperty(question.id));
    };

    const calculateDuration = (start) => {
        const endTime = Date.now();
        const durationInMilliseconds = endTime - start;
        const hours = Math.floor(durationInMilliseconds / 3600000);
        const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((durationInMilliseconds % 60000) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitSurvey = async (event) => {
        event.preventDefault();

        if (!areAllQuestionsAnswered()) {
            alert("Please answer all questions before submitting.");
            return;
        }

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

    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];
        return (
            <div className="form-question">
                <label>Question {currentQuestionIndex + 1}: {question.label}</label>
                <ul className="answer-list">
                    {question.answers.map((answer) => (
                        <li key={answer.id} className="answer-item">
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={answer.id}
                                checked={selectedAnswers[question.id] === answer.id}
                                onChange={() => handleSelectAnswer(question.id, answer.id)}
                            />
                            <label htmlFor={`answer-${answer.id}`}>{answer.label}</label>
                        </li>
                    ))}
                </ul>
                <div className="form-footer">
                    {currentQuestionIndex > 0 && (
                        <button type="button" onClick={handlePreviousQuestion} className="form-button">Previous</button>
                    )}
                    {currentQuestionIndex < questions.length - 1 && (
                        <button type="button" onClick={handleNextQuestion} className="form-button">Next</button>
                    )}
                    {currentQuestionIndex === questions.length - 1 && (
                        <button type="submit" className="form-button">Submit</button>
                    )}
                    <button type="button" onClick={() => navigate('/available-assessments')} className="form-button">Cancel</button>
                </div>
            </div>
        );
    };

    return (
        <div>
            {loading ? (
                <p className="loading-indicator">Loading...</p>
            ) : (
                <div>
                    <h2 className="specific-form-title">Take Survey: {survey.name || 'Loading...'}</h2>
                    <div className="specific-form-container">
                        <form onSubmit={handleSubmitSurvey}>
                            {renderQuestion()}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TakeSurveyForm;








