import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { fetchSurveyPerformance, fetchTopicPerformance } from '../../services/Api';

const GuestStatisticsList = () => {
    const [surveyPerformance, setSurveyPerformance] = useState({});
    const [topicPerformance, setTopicPerformance] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveyData = await fetchSurveyPerformance();
                const topicData = await fetchTopicPerformance();

                setSurveyPerformance(surveyData);
                setTopicPerformance(topicData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Convert surveyPerformance and topicPerformance objects into arrays
    const surveyPerformanceArray = Object.keys(surveyPerformance).map((internId) => {
        const surveyData = surveyPerformance[internId];
        return Object.keys(surveyData).map((surveyName) => ({
            internId: internId, // Add intern id
            surveyName: surveyName,
            averageDuration: surveyData[surveyName]['Average Duration'],
            averageScore: surveyData[surveyName]['Average Score'],
        }));
    }).flat(); // Flatten the array

    const topicPerformanceArray = Object.keys(topicPerformance).map((internId) => {
        const topicData = topicPerformance[internId];
        return Object.keys(topicData).map((topicName) => ({
            internId: internId, // Add intern id
            topicName: topicName,
            averageDuration: topicData[topicName]['Average Duration'],
            averageScore: topicData[topicName]['Average Score'],
        }));
    }).flat(); // Flatten the array

    return (
        <div>
            <h2>Guest Statistics</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3>Survey Performance</h3>
                    <DataTable
                        data={surveyPerformanceArray}
                        columnsToShow={['internId', 'surveyName', 'averageScore', 'averageDuration']}
                        columnTitles={{
                            internId: 'Intern ID', // Add column title
                            surveyName: 'Survey Name',
                            averageScore: 'Average Score',
                            averageDuration: 'Average Duration',
                        }}
                    />

                    <h3>Topic Performance</h3>
                    <DataTable
                        data={topicPerformanceArray}
                        columnsToShow={['internId', 'topicName', 'averageScore', 'averageDuration']}
                        columnTitles={{
                            internId: 'Intern ID', // Add column title
                            topicName: 'Topic Name',
                            averageScore: 'Average Score',
                            averageDuration: 'Average Duration',
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default GuestStatisticsList;






