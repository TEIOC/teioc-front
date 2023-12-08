import React, { useState, useEffect } from 'react';
import DataTable from './DataTable'; // Importez le composant DataTable
import { fetchTopics } from '../api/api';

function TopicList() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchTopics()
            .then((data) => setTopics(data))
            .catch((error) => console.error('Error fetching topics:', error));
    }, []);

    const columnsToShow = ['id', 'name']; // Les clés de vos données
    const columnTitles = {
        id: 'ID', // Titre personnalisé pour 'id'
        name: 'Topic Name' // Titre personnalisé pour 'name'
    };

    return (
        <div className="entity-list">
            <h2>Topics List</h2>
            <DataTable
                data={topics}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles} // Passer les titres personnalisés
            />
        </div>
    );
}

export default TopicList;

