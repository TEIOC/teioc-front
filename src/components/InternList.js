import React, { useState, useEffect } from 'react';
import DataTable from './DataTable'; // Importez le composant DataTable
import { fetchInterns } from '../api/api';

function InternList() {
  const [interns, setInterns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchInterns()
      .then((data) => {
        setInterns(data);
      })
      .catch((error) => console.error('Error fetching interns:', error));
  }, []);

  return (
    <div className="entity-list">
      <h2>Interns List</h2>
      <DataTable
        data={interns}
        columnsToShow={['id', 'name', 'email']}
      />
    </div>
  );
}
export default InternList;
