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

// Enregistrement des éléments Chart.js nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InternStatisticsChart = () => {
    // Récupération de l'intern connecté
    const intern = GetLoggedinIntern();

    // États pour stocker les données
    const [overallPerformance, setOverallPerformance] = useState(null);
    const [individualPerformance, setIndividualPerformance] = useState(null);
    const [topicPerformanceForIntern, setTopicPerformanceForIntern] = useState({});
    const [surveyPerformanceForIntern, setSurveyPerformanceForIntern] = useState({});
    const [surveyRankings, setSurveyRankings] = useState({});
    const [topicRankings, setTopicRankings] = useState({});

    // Utilisation de useEffect pour charger les données lorsque l'intern est disponible
    useEffect(() => {
        const fetchData = async () => {
            const overallPerf = await fetchOverallPerformance();
            const individualPerf = await fetchIndividualPerformance(intern.id);
            const surveyPerfForIntern = await fetchSurveyPerformanceForIntern(intern.id);
            const topicPerfForIntern = await fetchTopicPerformanceForIntern(intern.id);

            // Mise à jour des états avec les données récupérées
            setOverallPerformance(overallPerf);
            setIndividualPerformance(individualPerf);
            setSurveyPerformanceForIntern(surveyPerfForIntern);
            setTopicPerformanceForIntern(topicPerfForIntern);

            // Fonction pour récupérer et traiter les classements
            const fetchAndProcessRankings = async (fetchRankingFunction, perfData, setRankings) => {
                const tempRankings = {};

                for (const key in perfData) {
                    const id = perfData[key]["Survey ID"] || perfData[key]["Topic ID"];
                    const rankingsData = await fetchRankingFunction(id);

                    // Convertir en tableau, trier par score et trouver la position de l'intern
                    const sortedRankings = Object.entries(rankingsData)
                        .sort(([, a], [, b]) => b - a) // Tri par score
                        .map(([internId,]) => parseInt(internId));
                    const rank = sortedRankings.indexOf(intern.id) + 1;
                    const total = sortedRankings.length;
                    tempRankings[id] = rank ? `${rank} out of ${total}` : 'N/A';
                }

                setRankings(tempRankings);
            };

            // Récupérer et traiter les classements pour les enquêtes
            await fetchAndProcessRankings(fetchInternRankingBySurvey, surveyPerfForIntern, setSurveyRankings);

            // Récupérer et traiter les classements pour les sujets
            await fetchAndProcessRankings(fetchInternRankingByTopic, topicPerfForIntern, setTopicRankings);
        };

        // Vérifier si l'intern est disponible avant de charger les données
        if (intern && intern.id) {
            fetchData();
        }
    }, [intern]);

    // Fonction pour créer les données du graphique pour la moyenne des scores par sujet et enquête
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

    // Fonction pour créer les données du graphique pour la moyenne de la durée par sujet et enquête
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

    // Fonction pour créer les options du graphique pour la durée
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

    // Fonction pour créer les options du graphique pour le score
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

    // Fonction pour afficher les classements
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



