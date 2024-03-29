import React, { useState, useEffect } from 'react';
import { fetchPathwaysForIntern, fetchSurveyById } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import { useNavigate } from 'react-router-dom';
import DataTable from "./DataTable";
import '../../styles/list.css';

function CompletedSurveyList() {
    const [completedSurveys, setCompletedSurveys] = useState([]);
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement
    const intern = GetLoggedinIntern();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveys = async (pathways) => {
            return Promise.all(pathways.map(async (pathway) => {
                if (typeof pathway.survey_id === 'number') {
                    const survey = await fetchSurveyById(pathway.survey_id);
                    return {
                        ...pathway,
                        surveyName: survey.name,
                        score: pathway.score,
                        duration: pathway.duration
                    };
                } else {
                    console.error('Invalid survey ID:', pathway.survey_id);
                    return null;
                }
            }));
        };

        if (intern && intern.id) {
            fetchPathwaysForIntern(intern.id)
                .then(async pathways => {
                    const surveysWithData = await fetchSurveys(pathways);
                    setCompletedSurveys(surveysWithData);
                    setLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
                })
                .catch(error => {
                    console.error('Error fetching pathways:', error);
                    setLoading(false); // Mettre à jour l'état en cas d'erreur
                });
        }
    }, [intern]);

    const handleRowClick = (rowData) => {
        if (rowData && rowData.survey_id) {
            navigate(`/completed-assessments-details/${intern.id}/${rowData.survey_id}`);
        } else {
            console.error('Invalid rowData:', rowData);
        }
    };

    return (
        <div className="data-table-container">
            <h2 className="page-title">Completed Assessments</h2>
            {loading ? (
                <p className="loading-indicator">Loading...</p> // Afficher un indicateur de chargement en fonction de l'état de chargement
            ) : (
                <DataTable
                    data={completedSurveys}
                    columnsToShow={['surveyName', 'score', 'duration']}
                    columnTitles={{ surveyName: 'Survey', score: 'Score', duration: 'Duration' }}
                    redirectOnClick={true}
                    onRowClick={handleRowClick}
                />
            )}
        </div>
    );
}

export default CompletedSurveyList;












