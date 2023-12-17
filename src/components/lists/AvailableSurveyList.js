import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from './DataTable';
import { fetchAvailableSurveys, fetchTopics } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/datatable.css';

function AvailableSurveyList() {
    const [surveysWithTopics, setSurveysWithTopics] = useState([]);
    const intern = GetLoggedinIntern();
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleTakeSurvey = (survey_id) => {
        // Navigate to the ConfirmTakeSurveyPage with the survey ID
        navigate(`/confirm-take-assessment/${survey_id}`);
    };

    useEffect(() => {
        const getSurveysAndTopics = async () => {
            try {
                if (intern && intern.id) {
                    const [availableSurveys, topics] = await Promise.all([
                        fetchAvailableSurveys(intern.id),
                        fetchTopics(),
                    ]);

                    const combinedData = availableSurveys.map((survey) => {
                        const topic = topics.find((t) => t.id === survey.topicId);
                        return { ...survey, topicName: topic ? topic.name : 'Unknown' };
                    });

                    setSurveysWithTopics(combinedData);
                }
            } catch (error) {
                console.error('Error fetching available surveys or topics:', error);
            }
        };

        getSurveysAndTopics();
    }, [intern]);

    return (
        <div>
            <h2 className="page-title">Available Assessments</h2>
            <DataTable
                data={surveysWithTopics}
                columnsToShow={['topicName', 'name']}
                columnTitles={{ topicName: 'Topic', name: 'Survey' }}
                redirectOnClick={true} // Enable row-click redirects
                onRowClick={(survey_id) => {
                    handleTakeSurvey(survey_id);
                }}
            />
        </div>
    );
}

export default AvailableSurveyList;
