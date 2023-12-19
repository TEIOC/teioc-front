import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    fetchOverallPerformance,
    fetchIndividualPerformance,
    fetchSurveyPerformanceForIntern,
    fetchTopicPerformanceForIntern, fetchInternRankingByTopic, fetchInternRankingBySurvey,
} from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/chart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InternStatisticsChart = () => {
    const intern = GetLoggedinIntern();

    const [overallPerformance, setOverallPerformance] = useState(null);
    const [individualPerformance, setIndividualPerformance] = useState(null);
    const [topicPerformanceForIntern, setTopicPerformanceForIntern] = useState({});
    const [surveyPerformanceForIntern, setSurveyPerformanceForIntern] = useState({});
    const [surveyRankings, setSurveyRankings] = useState({});
    const [topicRankings, setTopicRankings] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const overallPerf = await fetchOverallPerformance();
            const individualPerf = await fetchIndividualPerformance(intern.id);
            const surveyPerfForIntern = await fetchSurveyPerformanceForIntern(intern.id);
            const topicPerfForIntern = await fetchTopicPerformanceForIntern(intern.id);

            setOverallPerformance(overallPerf);
            setIndividualPerformance(individualPerf);
            setSurveyPerformanceForIntern(surveyPerfForIntern);
            setTopicPerformanceForIntern(topicPerfForIntern);

            const fetchAndProcessRankings = async (fetchRankingFunction, perfData, setRankings) => {
                const tempRankings = {};

                for (const key in perfData) {
                    const id = perfData[key]["Survey ID"] || perfData[key]["Topic ID"];
                    const rankingsData = await fetchRankingFunction(id);

                    // Convert to array, sort by score, and find the intern's position
                    const sortedRankings = Object.entries(rankingsData)
                        .sort(([, a], [, b]) => b - a) // Sort by score
                        .map(([internId,]) => parseInt(internId));
                    const rank = sortedRankings.indexOf(intern.id) + 1;
                    const total = sortedRankings.length;
                    tempRankings[id] = rank ? `${rank} out of ${total}` : 'N/A';
                }

                setRankings(tempRankings);
            };

            await fetchAndProcessRankings(fetchInternRankingBySurvey, surveyPerfForIntern, setSurveyRankings);
            await fetchAndProcessRankings(fetchInternRankingByTopic, topicPerfForIntern, setTopicRankings);
        };

        if (intern && intern.id) {
            fetchData();
        }
    }, [intern]);







    // Function to create chart data for average score per topic and survey
    const createScoreChartData = (performanceData) => {
        const labels = Object.keys(performanceData);
        const scores = labels.map(label => performanceData[label]["Average Score"]);

        return {
            labels,
            datasets: [{
                label: 'Average Score',
                data: scores,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }],
        };
    };

    // Function to create chart data for average duration per topic and survey
    const createDurationChartData = (performanceData) => {
        const labels = Object.keys(performanceData);
        const durations = labels.map(label => performanceData[label]["Average Duration"]);

        return {
            labels,
            datasets: [{
                label: 'Average Duration',
                data: durations,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }],
        };
    };

    // Function to create chart options for duration
    const createDurationChartOptions = (xAxisLabel) => ({
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
                    text: 'Average Duration',
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    min: 0,
                },
            },
        },
    });

    // Function to create chart options for score
    const createScoreChartOptions = (xAxisLabel) => ({
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
                    text: 'Average Score',
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

    const displayRankings = (performanceData, rankings) => {
        return Object.keys(performanceData).map((key, index) => {
            const id = performanceData[key]["Survey ID"] || performanceData[key]["Topic ID"];
            const rank = rankings[id];

            return (
                <div key={index}>
                    <h4>{key}</h4>
                    <p>Rank: {rank}</p>
                </div>
            );
        });
    };






    return (
        <div className="statistics-container">
            <h2 className="statistics-title">Results and Statistics</h2>

            <div>
                <div className="statistics-card">
                    <h3>Overall Score Average</h3>
                    <p>{overallPerformance}</p>
                </div>
                <div className="statistics-card">
                    <h3>Individual Score Average</h3>
                    <p>{individualPerformance}</p>
                </div>
            </div>

            <div>
                <h3>Survey Rankings</h3>
                {displayRankings(surveyPerformanceForIntern, surveyRankings)}
            </div>

            <div>
                <h3>Topic Rankings</h3>
                {displayRankings(topicPerformanceForIntern, topicRankings)}
            </div>

            <div className="chart-row">
                <div className="chart-container">
                    <h3>Topic-wise Average Score</h3>
                    <Bar data={createScoreChartData(topicPerformanceForIntern)} options={createScoreChartOptions('Topics')} />
                </div>
                <div className="chart-container">
                    <h3>Topic-wise Average Duration</h3>
                    <Bar data={createDurationChartData(topicPerformanceForIntern)} options={createDurationChartOptions('Topics')} />
                </div>
            </div>

            <div className="chart-row">
                <div className="chart-container">
                    <h3>Survey-wise Average Score</h3>
                    <Bar data={createScoreChartData(surveyPerformanceForIntern)} options={createScoreChartOptions('Surveys')} />
                </div>
                <div className="chart-container">
                    <h3>Survey-wise Average Duration</h3>
                    <Bar data={createDurationChartData(surveyPerformanceForIntern)} options={createDurationChartOptions('Surveys')} />
                </div>
            </div>
        </div>
    );
};

export default InternStatisticsChart;


