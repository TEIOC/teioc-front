import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchAvailableSurveys, fetchTopics } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/datatable.css';

function AvailableSurveyList() {
    const [surveysWithTopics, setSurveysWithTopics] = useState([]);
    const intern = GetLoggedinIntern();

    useEffect(() => {
        const getSurveysAndTopics = async () => {
            try {
                if (intern && intern.id) {
                    const [availableSurveys, topics] = await Promise.all([fetchAvailableSurveys(intern.id), fetchTopics()]);
                    const combinedData = availableSurveys.map(survey => {
                        const topic = topics.find(t => t.id === survey.topicId);
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

    const columnsToShow = ['topicName', 'name'];
    const columnTitles = {
        topicName: 'Topic',
        name: 'Survey'
    };

    return (
        <div>
            <h2 className="page-title">Available Assessments</h2>
            <DataTable
                data={surveysWithTopics}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default AvailableSurveyList;

