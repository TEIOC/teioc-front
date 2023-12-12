import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchInterns } from '../../services/Api';
import '../../styles/list.css';

function InternList() {
    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchInterns();
                const transformedData = data.map(intern => ({
                    name: intern.name,
                    email: intern.email,
                }));
                setInterns(transformedData);
            } catch (error) {
                console.error('Error fetching interns:', error);
            }
        };

        fetchData();
    }, []);

    const columnsToShow = ['name', 'email'];
    const columnTitles = {
        name: 'Name',
        email: 'Email',
    };

    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Interns</h2>
            <DataTable
                data={interns}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles}
            />
        </div>
    );
}

export default InternList;


