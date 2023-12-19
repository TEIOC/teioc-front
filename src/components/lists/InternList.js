import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchInterns } from '../../services/Api';
import '../../styles/datatable.css';

function InternList() {
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchInterns();
                const transformedData = data.map(intern => ({
                    name: intern.name,
                    email: intern.email,
                }));
                setInterns(transformedData);
                setLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
            } catch (error) {
                console.error('Error fetching interns:', error);
                setLoading(false); // Mettre à jour l'état en cas d'erreur
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
            {loading ? (
                <p className="loading-indicator">Loading...</p> // Afficher un indicateur de chargement en fonction de l'état de chargement
            ) : (
                <DataTable
                    data={interns}
                    columnsToShow={columnsToShow}
                    columnTitles={columnTitles}
                />
            )}
        </div>
    );
}

export default InternList;




