import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSurveys, fetchTopics } from '../../services/Api';
import '../../styles/list.css';

function AllSurveyList() {
    const [surveyTopics, setSurveyTopics] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

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
                setLoading(false); // Update loading state when data fetching is complete
            })
            .catch((error) => {
                console.error('Error fetching surveys and topics:', error);
                setLoading(false); // Update loading state in case of an error
            });
    }, []);

    const columnsToShow = ['topicName', 'name'];
    const columnTitles = {
        topicName: 'Topic',
        name: 'Survey'
    };

    return (
        <div>
            <h2 className="page-title">All Assessments</h2>
            {loading ? ( // Display a loading indicator when loading is true
                <p className="loading-indicator">Loading...</p>
            ) : (
                <DataTable
                    data={surveyTopics}
                    columnsToShow={columnsToShow}
                    columnTitles={columnTitles}
                />
            )}
        </div>
    );
}

export default AllSurveyList;


