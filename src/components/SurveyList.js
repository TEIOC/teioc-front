import React, { useState, useEffect, useRef } from 'react';
import DataTable from './DataTable'; // Importez le composant DataTable
import { fetchSurveys } from '../api/api';

function SurveyList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Utilisez la fonction d'appel API pour récupérer la liste des sujets
    fetchSurveys()
      .then((data) => setTopics(data))
      .catch((error) => console.error('Error fetching topics:', error));
  }, []);

  const columnsToShow = ['id', 'name']; // Spécifiez les colonnes que vous souhaitez afficher

  return (
    <div className="entity-list">
      <h2>Topics List</h2>
      <DataTable data={topics} columnsToShow={columnsToShow} />
    </div>
  );
}

export default SurveyList;
