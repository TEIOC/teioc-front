import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchPathwaysForIntern, fetchSurveys, fetchTopics } from '../../services/Api'; // Import the necessary API functions
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/list.css';

function CompletedSurveyList() {
    const [pathways, setPathways] = useState([]);
    const [surveys, setSurveys] = useState([]); // State to store surveys
    const [topics, setTopics] = useState([]); // State to store topics
    const intern = GetLoggedinIntern();

    useEffect(() => {
        if (intern && intern.id) {
            // Fetch completed surveys for the intern
            fetchPathwaysForIntern(intern.id)
                .then(data => {
                    setPathways(data);
                })
                .catch(error => console.error('Error fetching pathways:', error));

            // Fetch all surveys and topics
            Promise.all([fetchSurveys(), fetchTopics()])
                .then(([surveyData, topicData]) => {
                    setSurveys(surveyData);
                    setTopics(topicData);
                })
                .catch(error => console.error('Error fetching surveys or topics:', error));
        }
    }, [intern]);

    // Function to map completed pathways to display topic name and survey name
    const mapCompletedSurveys = () => {
        return pathways.map(pathway => {
            const survey = surveys.find(s => s.id === pathway.survey_id);
            const topic = topics.find(t => t.id === survey.topicId);
            return {
                topicName: topic ? topic.name : 'Unknown',
                name: survey ? survey.name : 'Unknown',
                score: pathway.score,
                duration: pathway.duration,
            };
        });
    };

    const columnsToShow = ['topicName', 'name', 'score', 'duration'];
    const columnTitles = {
        topicName: 'Topic',
        name: 'Survey',
        score: 'Score',
        duration: 'Duration',
    };

    return (
        <div>
            <h2 className="list-title">Completed Assessments</h2>
            <DataTable
                data={mapCompletedSurveys()}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default CompletedSurveyList;


