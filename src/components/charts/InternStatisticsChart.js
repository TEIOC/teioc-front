import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    fetchOverallPerformance,
    fetchIndividualPerformance,
    fetchTopicWisePerformance,
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
    const [topicWisePerformanceForIntern, setTopicWisePerformanceForIntern] = useState({});
    const [surveyWisePerformanceData, setSurveyWisePerformanceData] = useState({});
    const [surveyPerformanceForIntern, setSurveyPerformanceForIntern] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const overallPerf = await fetchOverallPerformance();
            const individualPerf = await fetchIndividualPerformance(intern.id);
            const topicPerf = await fetchTopicWisePerformance();
            const surveyPerf = await fetchSurveyWisePerformance();
            const surveyPerfForIntern = await fetchSurveyPerformanceForIntern(intern.id);
            const topicWisePerformanceForIntern = await fetchTopicPerformanceForIntern(intern.id);

            setOverallPerformance(overallPerf);
            setIndividualPerformance(individualPerf);
            setTopicWisePerformanceData(topicPerf);
            setSurveyWisePerformanceData(surveyPerf);
            setSurveyPerformanceForIntern(surveyPerfForIntern);
            setTopicWisePerformanceForIntern(topicWisePerformanceForIntern);
        };

        if (intern && intern.id) {
            fetchData();
        }
    }, [intern]);

    const createChartOptions = (xAxisLabel) => ({
        scales: {
            x: {
                title: {
                    display: true,
                    text: xAxisLabel,
                },
                beginAtZero: true,
            },
            y: {
                title: {
                    display: true,
                    text: 'Values',
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    max: 10,
                    min: 0,
                },
            },
        },
    });

    const formatScoreChartData = (data) => ({
        labels: Object.keys(data),
        datasets: [{
            label: 'Average Score',
            data: Object.values(data),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }],
    });

    const formatScoreDurationChartData = (data) => {
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
            </div>

            <div className="chart-row">
                <div className="chart-container">
                    <h3>Individual Topic-wise Performance</h3>
                    <Bar data={formatScoreDurationChartData(topicWisePerformanceForIntern)} options={createChartOptions('Topics')} />
                </div>
                <div className="chart-container">
                    <h3>Individual Survey-wise Performance</h3>
                    <Bar data={formatScoreDurationChartData(surveyPerformanceForIntern)} options={createChartOptions('Surveys')} />
                </div>
            </div>

            <div className="chart-row">
                <div className="chart-container">
                    <h3>Overall Topic-wise Performance</h3>
                    <Bar data={formatScoreChartData(topicWisePerformanceData)} options={createChartOptions('Topics')} />
                </div>
                <div className="chart-container">
                    <h3>Overall Survey-wise Performance</h3>
                    <Bar data={formatScoreChartData(surveyWisePerformanceData)} options={createChartOptions('Surveys')} />
                </div>
            </div>
        </div>
    );
};

export default InternStatisticsChart;
