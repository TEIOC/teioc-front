// TopicList.js
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { fetchTopics } from '../api/api';

function TopicList() {
    const [topics, setTopics] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Utilisez la fonction d'appel API pour récupérer la liste des sujets
        fetchTopics()
            .then(data => setTopics(data))
            .catch(error => console.error('Error fetching topics:', error));
    }, []);

    const pageCount = Math.ceil(topics.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = topics.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="entity-list">
            <h2>Topics List</h2>
            <ul>
                {currentItems.map(topic => (
                    <li key={topic.id}>{topic.name}</li>
                ))}
            </ul>
            <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={paginate} />
        </div>
    );
}

export default TopicList;


