import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSurveys, fetchTopics, fetchQuestionsCountBySurvey } from '../../services/Api';
import '../../styles/list.css';

function SurveyList() {
    const [surveyTopics, setSurveyTopics] = useState([]);

    useEffect(() => {
        Promise.all([fetchSurveys(), fetchTopics()])
            .then(async ([surveys, topics]) => {
                console.log('Fetched surveys:', surveys);
                console.log('Fetched topics:', topics);

                const transformedData = await Promise.all(surveys.map(async (survey) => {
                    const surveyTopic = topics.find(topic => topic.id === survey.topicId);
                    console.log('Processing survey:', survey);
                    console.log('Found topic:', surveyTopic);

                    const questionCount = await fetchQuestionsCountBySurvey(survey.id);
                    console.log('Fetched question count:', questionCount);

                    return {
                        name: survey.name,
                        topicName: surveyTopic ? surveyTopic.name : 'No topic',
                        questionCount: questionCount
                    };
                }));

                console.log('Transformed data:', transformedData);
                setSurveyTopics(transformedData);
            })
            .catch((error) => console.error('Error fetching surveys, topics, and question counts:', error));
    }, []);

    const columnsToShow = ['topicName', 'name', 'questionCount'];
    const columnTitles = {
        topicName: 'Topic',
        name: 'Survey',
        questionCount: 'Questions Number'
    };

    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Topics and Surveys</h2>
            <DataTable
                data={surveyTopics}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default SurveyList;







