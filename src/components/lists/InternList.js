import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchInterns } from '../../api/api';
import '../../styles/list.css'

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
        <div className="base-style max-width-600">
            <h2 className="list-title">Interns List</h2>
            <DataTable
                data={interns}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default InternList;

