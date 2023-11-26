import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Pagination from './Pagination'; // Import the Pagination component

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

    // Calculate the number of pages
    const pageCount = Math.ceil(topics.length / itemsPerPage);

    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = topics.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="entity-list">
            <h2>Topics list</h2>
            <ul>
                {currentItems.map(topic => (
                    <li className="topic-item" key={topic.id}>{topic.name}</li>
                ))}
            </ul>
            <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={paginate} />
        </div>
    );
}

export default TopicList;

