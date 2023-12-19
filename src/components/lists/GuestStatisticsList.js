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
        return {
            surveyName: Object.keys(surveyData)[0], // Assuming only one key in each object
            averageDuration: surveyData[Object.keys(surveyData)[0]]['Average Duration'],
            averageScore: surveyData[Object.keys(surveyData)[0]]['Average Score'],
        };
    });

    const topicPerformanceArray = Object.keys(topicPerformance).map((internId) => {
        const topicData = topicPerformance[internId];
        return {
            topicName: Object.keys(topicData)[0], // Assuming only one key in each object
            averageDuration: topicData[Object.keys(topicData)[0]]['Average Duration'],
            averageScore: topicData[Object.keys(topicData)[0]]['Average Score'],
        };
    });

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
                        columnsToShow={['surveyName', 'averageScore', 'averageDuration']}
                        columnTitles={{
                            surveyName: 'Survey Name',
                            averageScore: 'Average Score',
                            averageDuration: 'Average Duration',
                        }}
                    />

                    <h3>Topic Performance</h3>
                    <DataTable
                        data={topicPerformanceArray}
                        columnsToShow={['topicName', 'averageScore', 'averageDuration']}
                        columnTitles={{
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




