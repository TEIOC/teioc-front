import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchRemainingSurveys, fetchTopics } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/list.css';

function SurveyWithTopicList() {
    const [surveysWithTopics, setSurveysWithTopics] = useState([]);
    const intern = GetLoggedinIntern();

    useEffect(() => {
        const getSurveysAndTopics = async () => {
            try {
                if (intern && intern.id) {
                    const [remainingSurveys, topics] = await Promise.all([fetchRemainingSurveys(intern.id), fetchTopics()]);
                    const combinedData = remainingSurveys.map(survey => {
                        const topic = topics.find(t => t.id === survey.topicId);
                        return { ...survey, topicName: topic ? topic.name : 'Unknown' };
                    });
                    setSurveysWithTopics(combinedData);
                }
            } catch (error) {
                console.error('Error fetching remaining surveys or topics:', error);
            }
        };

        getSurveysAndTopics();
    }, [intern]);

    const columnsToShow = ['topicName', 'name'];
    const columnTitles = {
        topicName: 'Topic',
        name: 'Survey Name'
    };

    return (
        <div>
            <h2 className="list-title">Topics and Surveys List</h2>
            <DataTable
                data={surveysWithTopics}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default SurveyWithTopicList;

