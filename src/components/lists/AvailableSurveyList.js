import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchAvailableSurveys, fetchTopics, createPathway } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import { useNavigate } from 'react-router-dom';
import '../../styles/datatable.css';

function AvailableSurveyList() {
    const [surveysWithTopics, setSurveysWithTopics] = useState([]);
    const intern = GetLoggedinIntern();
    const navigate = useNavigate();

    useEffect(() => {
        const getSurveysAndTopics = async () => {
            try {
                if (intern && intern.id) {
                    const [availableSurveys, topics] = await Promise.all([fetchAvailableSurveys(intern.id), fetchTopics()]);
                    const combinedData = availableSurveys.map(survey => ({
                        ...survey,
                        topicName: topics.find(t => t.id === survey.topicId)?.name || 'Unknown'
                    }));
                    setSurveysWithTopics(combinedData);
                }
            } catch (error) {
                console.error('Error fetching available surveys or topics:', error);
            }
        };

        getSurveysAndTopics();
    }, [intern]);

    const handleTakeSurvey = async (survey_id) => {
        try {
            console.log('Intern ID:', intern.id);
            console.log('Survey ID:', survey_id);
            const pathwayData = {
                intern_id: intern.id,
                survey_id: survey_id,
            };
            await createPathway(pathwayData);
            navigate(`/take-assessment/${survey_id}`);
        } catch (error) {
            console.error('Error creating pathway:', error);
            // Handle error appropriately
        }
    };

    const columnsToShow = ['topicName', 'name', 'action'];
    const columnTitles = {
        topicName: 'Topic',
        name: 'Survey',
        action: 'Action'
    };

    const modifiedData = surveysWithTopics.map(survey => ({
        ...survey,
        action: <button onClick={() => handleTakeSurvey(survey.id)}>Take Survey</button>
    }));

    return (
        <div>
            <h2 className="page-title">Available Assessments</h2>
            <DataTable
                data={modifiedData}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default AvailableSurveyList;



