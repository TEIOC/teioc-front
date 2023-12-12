import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSurveys } from '../../services/Api';
import '../../styles/list.css'

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
        name: 'Survey'
    };

    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Surveys</h2>
            <DataTable
                data={surveys}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default SurveyList;


