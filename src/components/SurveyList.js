import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSurveys } from '../api/api';

function SurveyList() {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        fetchSurveys()
            .then((data) => setSurveys(data))
            .catch((error) => console.error('Error fetching surveys:', error));
    }, []);

    const columnsToShow = ['id', 'name'];
    const columnTitles = {
        id: 'ID',
        name: 'Survey Name'
    };

    return (
        <div className="entity-list">
            <h2>Surveys List</h2>
            <DataTable
                data={surveys}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default SurveyList;

