import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchTopics } from '../../api/api';
import '../../styles/list.css'

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

