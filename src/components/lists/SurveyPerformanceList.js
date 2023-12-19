import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { fetchSurveyPerformance, fetchInterns, fetchInternById } from '../../services/Api'; // Assurez-vous d'importer fetchInterns depuis le bon chemin
import '../../styles/list.css';

const SurveyPerformanceList = () => {
    const [surveyPerformance, setSurveyPerformance] = useState({});
    const [interns, setInterns] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveyData = await fetchSurveyPerformance();
                setSurveyPerformance(surveyData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching survey data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchInternsData = async () => {
            try {
                // Fetch all interns and store them in a dictionary by ID
                const internsData = await fetchInterns();
                const internsById = {};
                internsData.forEach(intern => {
                    internsById[intern.id] = intern;
                });
                setInterns(internsById);
            } catch (error) {
                console.error('Error fetching interns data:', error);
            }
        };

        fetchInternsData();
    }, []);

    const surveyPerformanceArray = [];

    for (const internId in surveyPerformance) {
        if (surveyPerformance.hasOwnProperty(internId)) {
            const surveyData = surveyPerformance[internId];

            for (const surveyName in surveyData) {
                if (surveyData.hasOwnProperty(surveyName)) {
                    const survey = surveyData[surveyName];
                    const intern = interns[internId];

                    surveyPerformanceArray.push({
                        internName: intern ? intern.name : 'N/A', // Use intern's name or 'N/A' if not available
                        surveyName,
                        averageDuration: survey['Average Duration'],
                        averageScore: survey['Average Score'],
                    });
                }
            }
        }
    }

    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Survey Performance</h2>
            {loading ? (
                <p className="loading-indicator">Loading...</p>
            ) : (
                <DataTable
                    data={surveyPerformanceArray}
                    columnsToShow={['internName', 'surveyName', 'averageScore', 'averageDuration']}
                    columnTitles={{
                        internName: 'Intern',
                        surveyName: 'Survey',
                        averageScore: 'Average Score',
                        averageDuration: 'Average Duration',
                    }}
                />
            )}
        </div>
    );
};

export default SurveyPerformanceList;






