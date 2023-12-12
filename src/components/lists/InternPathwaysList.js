import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchPathwaysForIntern } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import '../../styles/list.css';

function InternPathwaysList() {
    const [pathways, setPathways] = useState([]);
    const intern = GetLoggedinIntern();

    useEffect(() => {
        if (intern && intern.id) {
            fetchPathwaysForIntern(intern.id)
                .then(data => {
                    setPathways(data);
                })
                .catch(error => console.error('Error fetching pathways:', error));
        }
    }, [intern]);

    const columnsToShow = ['survey_id', 'score', 'duration'];
    const columnTitles = {
        survey_id: 'Survey ID',
        score: 'Score',
        duration: 'Duration'
    };

    return (
        <div>
            <h2 className="list-title">Completed Assessments</h2>
            <DataTable
                data={pathways}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default InternPathwaysList;

