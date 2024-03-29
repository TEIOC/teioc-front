import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from './DataTable';
import { fetchAvailableSurveys, fetchTopics } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/list.css';

function AvailableSurveyList() {
    const [surveysWithTopics, setSurveysWithTopics] = useState([]);
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement
    const intern = GetLoggedinIntern();
    const isActivated = intern ? intern.status : '';
    const navigate = useNavigate();

    const handleTakeSurvey = (rowData) => {
        if (rowData && rowData.id) {
            navigate(`/confirm-take-assessment/${rowData.id}`);
        } else {
            console.error('Invalid rowData:', rowData);
        }
    };

    useEffect(() => {
        const getSurveysAndTopics = async () => {
            try {
                if (intern && intern.id) {
                    const [availableSurveys, topics] = await Promise.all([
                        fetchAvailableSurveys(intern.id),
                        fetchTopics(),
                    ]);

                    const combinedData = availableSurveys.map((survey) => {
                        const topic = topics.find((t) => t.id === survey.topicId);
                        return { ...survey, topicName: topic ? topic.name : 'Unknown' };
                    });

                    setSurveysWithTopics(combinedData);
                    setLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
                }
            } catch (error) {
                console.error('Error fetching available surveys or topics:', error);
                setLoading(false); // Mettre à jour l'état en cas d'erreur
            }
        };

        getSurveysAndTopics();
    }, [intern]);

    return (
        <div className={`data-table-container ${!isActivated ? 'not-activated' : ''}`}>
            <h2 className="page-title">Available Assessments</h2>
            {loading ? (
                <p className="loading-indicator">Loading...</p> // Afficher un indicateur de chargement en fonction de l'état de chargement
            ) : (
                <DataTable
                    data={surveysWithTopics}
                    columnsToShow={['topicName', 'name']}
                    columnTitles={{ topicName: 'Topic', name: 'Survey' }}
                    redirectOnClick={true}
                    onRowClick={isActivated ? handleTakeSurvey : () => { }}
                />
            )}
        </div>
    );
}

export default AvailableSurveyList;


