import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { fetchSurveyPerformance } from '../../services/Api';
import '../../styles/list.css';

const SurveyPerformanceList = () => {
    const [surveyPerformance, setSurveyPerformance] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveyData = await fetchSurveyPerformance();
                setSurveyPerformance(surveyData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const surveyPerformanceArray = Object.keys(surveyPerformance).map((internId) => {
        const surveyData = surveyPerformance[internId];
        return Object.keys(surveyData).map((surveyName) => ({
            internId: internId,
            surveyName: surveyName,
            averageDuration: surveyData[surveyName]['Average Duration'],
            averageScore: surveyData[surveyName]['Average Score'],
        }));
    }).flat();

    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Survey Performance</h2>
                <DataTable
                    data={surveyPerformanceArray}
                    columnsToShow={['internId', 'surveyName', 'averageScore', 'averageDuration']}
                    columnTitles={{
                        internId: 'Intern ID',
                        surveyName: 'Survey Name',
                        averageScore: 'Average Score',
                        averageDuration: 'Average Duration',
                    }}
                />
        </div>
    );
};

export default SurveyPerformanceList;
