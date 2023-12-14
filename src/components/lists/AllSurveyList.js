import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSurveys, fetchTopics } from '../../services/Api';
import '../../styles/datatable.css';

function AllSurveyList() {
    const [surveyTopics, setSurveyTopics] = useState([]);

    useEffect(() => {
        Promise.all([fetchSurveys(), fetchTopics()])
            .then(([surveys, topics]) => {
                const transformedData = surveys.map(survey => {
                    const surveyTopic = topics.find(topic => topic.id === survey.topicId);
                    return {
                        name: survey.name,
                        topicName: surveyTopic ? surveyTopic.name : 'No topic'
                    };
                });
                setSurveyTopics(transformedData);
            })
            .catch((error) => console.error('Error fetching surveys and topics:', error));
    }, []);

    const columnsToShow = ['topicName', 'name'];
    const columnTitles = {
        topicName: 'Topic',
        name: 'Survey'
    };

    return (
        <div>
            <h2 className="list-title">All Assessments</h2>
            <DataTable
                data={surveyTopics}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default AllSurveyList;
