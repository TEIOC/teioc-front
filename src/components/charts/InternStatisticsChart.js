import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    fetchOverallPerformance,
    fetchIndividualPerformance,
    fetchTopicWisePerformance,
    fetchTopicWisePerformanceForIntern,
    fetchSurveyWisePerformance,
    fetchSurveyPerformanceForIntern,
    fetchTopicPerformanceForIntern
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
    const [topicWisePerformanceForIntern, setTopicWisePerformanceForIntern] = useState({});
    const [surveyWisePerformanceData, setSurveyWisePerformanceData] = useState({});
    const [surveyPerformanceForIntern, setSurveyPerformanceForIntern] = useState({});


// À l'intérieur de la fonction useEffect
    useEffect(() => {
        const loadStatistics = async () => {
            const overallPerf = await fetchOverallPerformance();
            const individualPerf = await fetchIndividualPerformance(intern.id);
            const topicPerf = await fetchTopicWisePerformance();
            const topicPerfForIntern = await fetchTopicWisePerformanceForIntern(intern.id);
            const surveyPerf = await fetchSurveyWisePerformance();
            const surveyPerfForIntern = await fetchSurveyPerformanceForIntern(intern.id);
            const topicWisePerformanceForIntern = await fetchTopicPerformanceForIntern(intern.id);

            console.log("Overall Performance:", overallPerf);
            console.log("Individual Performance:", individualPerf);
            console.log("Topic Performance:", topicPerf);
            console.log("Topic Performance for Intern:", topicPerfForIntern);
            console.log("Survey Performance:", surveyPerf);
            console.log("Survey Performance for Intern:", surveyPerfForIntern);
            console.log("Topic Performance for Intern:", topicWisePerformanceForIntern);

            setOverallPerformance(overallPerf);
            setIndividualPerformance(individualPerf);
            setTopicWisePerformanceData(topicPerf);
            setTopicWisePerformanceForInternData(topicPerfForIntern);
            setSurveyWisePerformanceData(surveyPerf);
            setSurveyPerformanceForIntern(surveyPerfForIntern);
            setTopicWisePerformanceForIntern(topicWisePerformanceForIntern);
        };

        if (intern && intern.id) {
            loadStatistics();
        }
    }, [intern]);

// Dans la fonction formatScoreChartData
    const formatScoreChartData = (data) => {
        console.log("Data for formatScoreChartData:", data);
        return {
            labels: Object.keys(data),
            datasets: [{
                label: 'Average Score',
                data: Object.values(data),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }],
        };
    };

// Dans la fonction formatScoreDurationChartData
    const formatScoreDurationChartData = (data) => {
        console.log("Data for formatScoreDurationChartData:", data);
        const labels = Object.keys(data);
        const scores = labels.map(label => data[label]["Average Score"]);
        const durations = labels.map(label => data[label]["Average Duration"]);

        return {
            labels,
            datasets: [
                {
                    label: 'Average Score',
                    data: scores,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Average Duration',
                    data: durations,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
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
                    <h3>Survey Performance for Intern</h3>
                    <Bar data={formatScoreDurationChartData(surveyPerformanceForIntern)} />
                </div>
                <div className="chart-container">
                    <h3>Topic Performance for Intern</h3>
                    <Bar data={formatScoreDurationChartData(topicWisePerformanceForIntern)} />
                </div>
                <div className="chart-container">
                    <h3>Individual Topic-wise Performance</h3>
                    <Bar data={formatScoreChartData(topicWisePerformanceForInternData)} />
                </div>
                <div className="chart-container">
                    <h3>Overall Topic-wise Performance</h3>
                    <Bar data={formatScoreChartData(topicWisePerformanceData)} />
                </div>
                <div className="chart-container">
                    <h3>Overall Survey-wise Performance</h3>
                    <Bar data={formatScoreChartData(surveyWisePerformanceData)} />
                </div>
            </div>
        </div>
    );
};

export default InternStatisticsChart;




