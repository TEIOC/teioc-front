import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchTopics } from '../api/api';

function TopicList() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchTopics()
            .then((data) => setTopics(data))
            .catch((error) => console.error('Error fetching topics:', error));
    }, []);

    const columnsToShow = ['id', 'name'];
    const columnTitles = {
        id: 'ID',
        name: 'Topic Name'
    };

    // Utilisation de la classe "base-style" et "max-width-600" pour appliquer les styles généraux
    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Topics List</h2>
            <DataTable
                data={topics}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default TopicList;


