import React, { useState, useEffect } from 'react';
import DataTable from './DataTable'; // Importez le composant DataTable
import { fetchSurveys } from '../api/api';

function SurveyList() {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        fetchSurveys()
            .then((data) => setSurveys(data))
            .catch((error) => console.error('Error fetching surveys:', error));
    }, []);

    const columnsToShow = ['id', 'name']; // Les clés de vos données
    const columnTitles = {
        id: 'ID', // Titre personnalisé pour 'id'
        name: 'Survey Name' // Titre personnalisé pour 'name'
    };

    return (
        <div className="entity-list">
            <h2>Surveys List</h2>
            <DataTable
                data={surveys}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles} // Passer les titres personnalisés
            />
        </div>
    );
}

export default SurveyList;

