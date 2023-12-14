import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSurveyWithQuestions, submitSurveyAnswers, submitPathway } from '../../services/Api'; // Import both submission functions
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';

const TakeSurveyForm = () => {
    const [survey, setSurvey] = useState(null);
    const [answers, setAnswers] = useState({});
    const [startTime, setStartTime] = useState(Date.now());
    const { survey_id } = useParams();
    const navigate = useNavigate();
    const intern = GetLoggedinIntern(); // Fetch logged-in intern details
    const intern_id = intern ? intern.id : null; // Get intern ID
    console.log('Intern ID:', intern_id);
    console.log('Survey ID:', survey_id);

    // Define and set the initial score value
    const [score, setScore] = useState(0);

    useEffect(() => {
        const getSurvey = async () => {
            try {
                const fetchedSurvey = await fetchSurveyWithQuestions(survey_id);
                setSurvey(fetchedSurvey);
                setStartTime(Date.now()); // Start timer when survey is fetched
            } catch (error) {
                console.error('Error fetching survey:', error);
            }
        };

        getSurvey();
    }, [survey_id]);

    const handleAnswerChange = (questionId, answerId) => {
        setAnswers({
            ...answers,
            [questionId]: answerId
        });
    };

    const formatDuration = (duration) => {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    };

    const handleSubmit = async (submissionType) => {
        console.log('Survey ID for Submission:', survey_id);
        console.log('Intern ID for Submission:', intern_id);
        const duration = Date.now() - startTime; // Calculate duration in milliseconds
        const formattedDuration = formatDuration(duration); // Format duration

        try {
            if (submissionType === 'answers') {
                // Pass intern_id, survey_id, answers, and formattedDuration for saving answers
                await submitSurveyAnswers(survey_id, intern_id, answers, formattedDuration);
            } else if (submissionType === 'pathway') {
                // Pass intern_id, survey_id, score, and formattedDuration for saving pathway
                await submitPathway(survey_id, intern_id, score, formattedDuration);
            }
            navigate('/completed-assessments');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
            <h2>{survey?.name}</h2>
            {survey?.questionsWithAnswers.map(question => (
                <div key={question.question.id}>
                    <h3>{question.question.label}</h3>
                    {question.answers.map(answer => (
                        <div key={answer.id}>
                            <input
                                type="radio"
                                name={`question-${question.question.id}`}
                                value={answer.id}
                                checked={answers[question.question.id] === answer.id}
                                onChange={() => handleAnswerChange(question.question.id, answer.id)}
                            />
                            {answer.label}
                        </div>
                    ))}
                </div>
            ))}
            {/* Add buttons for different types of submission */}
            <button onClick={() => handleSubmit('answers')}>Submit Answers</button>
            <button onClick={() => handleSubmit('pathway')}>Submit Pathway</button>
        </div>
    );
};

export default TakeSurveyForm;


