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
    const [startTime, setStartTime] = useState(null);
    const intern = GetLoggedinIntern();

    useEffect(() => {
        fetchSurveyById(survey_id)
            .then(setSurvey)
            .catch(error => console.error('Error fetching survey:', error));

        fetchQuestionsAndAnswersForSurvey(survey_id)
            .then((questionsData) => {
                setQuestions(questionsData);
                setStartTime(Date.now());
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

    const renderQuestions = () => {
        return questions.map((question, index) => (
            <div key={question.id} className="form-question">
                <label>Question {index + 1}: {question.label}</label>
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
            </div>
        ));
    };

    return (
        <div>
            <h2 className="specific-form-title">Take Survey: {survey.name || 'Loading...'}</h2>
            <div className="specific-form-container">
                <form onSubmit={handleSubmitSurvey}>
                    {renderQuestions()}
                    <div className="form-footer">
                        <button type="submit" className="form-button">Submit</button>
                        <button type="button" onClick={() => navigate('/available-assessments')} className="form-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TakeSurveyForm;





