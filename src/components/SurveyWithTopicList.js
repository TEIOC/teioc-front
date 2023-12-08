import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSurveys, fetchTopics } from '../api/api';

function SurveyWithTopicList() {
    const [surveysWithTopics, setSurveysWithTopics] = useState([]);

    useEffect(() => {
        const getSurveysAndTopics = async () => {
            try {
                const [surveys, topics] = await Promise.all([fetchSurveys(), fetchTopics()]);
                const combinedData = surveys.map(survey => {
                    const topic = topics.find(t => t.id === survey.topicId);
                    return { ...survey, topicName: topic ? topic.name : 'Unknown' };
                });
                setSurveysWithTopics(combinedData);
            } catch (error) {
                console.error('Error fetching surveys or topics:', error);
            }
        };

        getSurveysAndTopics();
    }, []);

    const columnsToShow = ['topicName', 'name'];
    const columnTitles = {
        topicName: 'Topic' ,
        name: 'Survey Name'
    };

    return (
        <div className="entity-list">
            <h2>Topics and Surveys List</h2>
            <DataTable
                data={surveysWithTopics}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default SurveyWithTopicList;

