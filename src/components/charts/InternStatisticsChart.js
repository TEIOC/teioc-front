import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    fetchOverallPerformance,
    fetchIndividualPerformance,
    fetchTopicWisePerformance,
    fetchTopicWisePerformanceForIntern,
    fetchSurveyWisePerformance
} from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/chart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InternStatisticsChart = () => {
    const intern = GetLoggedinIntern();

    const [overallPerformance, setOverallPerformance] = useState(null);
    const [individualPerformance, setIndividualPerformance] = useState(null);
    const [topicWisePerformanceData, setTopicWisePerformanceData] = useState({});
    const [topicWisePerformanceForInternData, setTopicWisePerformanceForInternData] = useState({});
    const [surveyWisePerformanceData, setSurveyWisePerformanceData] = useState({});

    useEffect(() => {
        const loadStatistics = async () => {
            const overallPerf = await fetchOverallPerformance();
            const individualPerf = await fetchIndividualPerformance(intern.id);
            const topicPerf = await fetchTopicWisePerformance();
            const topicPerfForIntern = await fetchTopicWisePerformanceForIntern(intern.id);
            const surveyPerf = await fetchSurveyWisePerformance();

            setOverallPerformance(overallPerf);
            setIndividualPerformance(individualPerf);
            setTopicWisePerformanceData(topicPerf);
            setTopicWisePerformanceForInternData(topicPerfForIntern);
            setSurveyWisePerformanceData(surveyPerf);
        };

        if (intern && intern.id) {
            loadStatistics();
        }
    }, [intern]);

    const formatChartData = (data) => {
        return {
            labels: Object.keys(data),
            datasets: [{
                label: 'Average Score',
                data: Object.values(data),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }],
        };
    };

    return (
        <div className="statistics-container">
            <h2 className="statistics-title">Results and Statistics</h2>

            <div>
                <div className="statistics-card">
                    <h3>Overall Performance</h3>
                    <p>{overallPerformance}</p>
                </div>
                <div className="statistics-card">
                    <h3>Individual Performance</h3>
                    <p>{individualPerformance}</p>
                </div>
                <div className="chart-container">
                    <h3>Individual Topic-wise Performance</h3>
                    <Bar data={formatChartData(topicWisePerformanceForInternData)} />
                </div>
                <div className="chart-container">
                    <h3>Overall Topic-wise Performance</h3>
                    <Bar data={formatChartData(topicWisePerformanceData)} />
                </div>
                <div className="chart-container">
                    <h3>Overall Survey-wise Performance</h3>
                    <Bar data={formatChartData(surveyWisePerformanceData)} />
                </div>
            </div>
        </div>
    );
};

export default InternStatisticsChart;




