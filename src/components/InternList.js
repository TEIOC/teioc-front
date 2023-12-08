import React, { useState, useEffect } from 'react';
import DataTable from './DataTable'; // Importez le composant DataTable
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

    const columnsToShow = ['id', 'name', 'email']; // Les clés de vos données
    const columnTitles = {
        id: 'ID', // Titre personnalisé pour 'id'
        name: 'Name', // Titre personnalisé pour 'name'
        email: 'Email' // Titre personnalisé pour 'email'
    };

    return (
        <div className="entity-list">
            <h2>Interns List</h2>
            <DataTable
                data={interns}
                columnsToShow={columnsToShow}
                columnTitles={columnTitles} // Passer les titres personnalisés
            />
        </div>
    );
}

export default InternList;

