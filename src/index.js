import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// DataTables
import 'datatables.net-dt/css/jquery.dataTables.css'; // Importer les styles DataTables
import $ from 'jquery'; // Importer jQuery
import 'datatables.net'; // Importer DataTables
import 'datatables.net-dt/css/jquery.dataTables.css'; // Importer les styles DataTables

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
