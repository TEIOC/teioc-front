// TopicList.js
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Pagination from './Pagination';

function TopicList() {
    const [topics, setTopics] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch('http://localhost:8080/topics')
            .then(response => response.json())
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


