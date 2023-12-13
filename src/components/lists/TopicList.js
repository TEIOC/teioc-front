import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchTopics } from '../../services/Api';
import '../../styles/datatable.css';

function TopicList() {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        fetchTopics()
            .then((data) => {
                const transformedData = data.map(topic => ({ name: topic.name }));
                setTopics(transformedData);
            })
            .catch((error) => console.error('Error fetching topics:', error));
    }, []);
    const columnsToShow = ['name'];
    const columnTitles = {
        name: 'Topic'
    };

    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Topics</h2>
            <DataTable
                data={topics}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default TopicList;




