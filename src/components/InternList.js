import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchInterns } from '../api/api';

function InternList() {
    const [interns, setInterns] = useState([]);
    useEffect(() => {
        fetchInterns()
            .then((data) => {
                setInterns(data);
            })
            .catch((error) => console.error('Error fetching interns:', error));
    }, []);
    const columnsToShow = ['id', 'name', 'email'];
    const columnTitles = {
        id: 'ID',
        name: 'Name',
        email: 'Email'
    };

    return (
        <div className="entity-list">
            <h2>Interns List</h2>
            <DataTable
                data={interns}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default InternList;

