import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    fetchOverallPerformance,
    fetchIndividualPerformance,
    fetchSurveyPerformanceForIntern,
    fetchTopicPerformanceForIntern,
    fetchInternRankingByTopic,
    fetchInternRankingBySurvey,
} from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/chart.css';
import DataTable from '../lists/DataTable';

// Register required Chart.js elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InternStatisticsChart = () => {
    const intern = GetLoggedinIntern();

    const columnsToShow = ["surveyName", "avgScore", "avgDuration", "rank"];

    const columnTitles = {
        surveyName: "Survey Name",
        avgScore: "Average Score",
        avgDuration: "Average Duration",
        rank: "Rank",
    };

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

                    const sortedRankings = Object.entries(rankingsData)
                        .sort(([, a], [, b]) => b - a)
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

    const createChartData = (performanceData, labelKey, dataKey, backgroundColor) => {
        const labels = Object.keys(performanceData);
        const data = labels.map(label => performanceData[label][dataKey]);

        return {
            labels,
            datasets: [{
                label: columnTitles[labelKey],
                data,
                backgroundColor,
            }],
        };
    };

    const createChartOptions = (xAxisLabel, yAxisLabel, max = 10) => ({
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
                    text: yAxisLabel,
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    max,
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
                <DataTable
                    data={formatDataForDataTable(surveyPerformanceForIntern, surveyRankings)}
                    columnsToShow={columnsToShow}
                    columnTitles={columnTitles}
                />
            </div>

            <div>
                <div className="statistics-card">
                    <h3>Survey Rankings</h3>
                    {displayRankings(surveyPerformanceForIntern, surveyRankings)}
                </div>

                <div className="statistics-card">
                    <h3>Topic Rankings</h3>
                    {displayRankings(topicPerformanceForIntern, topicRankings)}
                </div>
            </div>

            <div className="chart-row">
                <div className="chart-container">
                    <h3>Topic-wise Average Score</h3>
                    <Bar data={createChartData(topicPerformanceForIntern, "avgScore", "Average Score", 'rgba(53, 162, 235, 0.5)')} options={createChartOptions('Topics', 'Average Score')} />
                </div>
                <div className="chart-container">
                    <h3>Topic-wise Average Duration</h3>
                    <Bar data={createChartData(topicPerformanceForIntern, "avgDuration", "Average Duration", 'rgba(255, 99, 132, 0.5)')} options={createChartOptions('Topics', 'Average Duration')} />
                </div>
            </div>

            <div className="chart-row">
                <div className="chart-container">
                    <h3>Survey-wise Average Score</h3>
                    <Bar data={createChartData(surveyPerformanceForIntern, "avgScore", "Average Score", 'rgba(53, 162, 235, 0.5)')} options={createChartOptions('Surveys', 'Average Score')} />
                </div>
                <div className="chart-container">
                    <h3>Survey-wise Average Duration</h3>
                    <Bar data={createChartData(surveyPerformanceForIntern, "avgDuration", "Average Duration", 'rgba(255, 99, 132, 0.5)')} options={createChartOptions('Surveys', 'Average Duration')} />
                </div>
            </div>
        </div>
    );
};

const formatDataForDataTable = (performanceData, rankings) => {
    const data = [];
    for (const key in performanceData) {
        const id = performanceData[key]["Survey ID"];
        const avgScore = performanceData[key]["Average Score"];
        const avgDuration = performanceData[key]["Average Duration"];
        const rank = rankings[id] || 'N/A';
        data.push({ surveyName: key, avgScore, avgDuration, rank });
    }
    return data;
};

export default InternStatisticsChart;




