// InternList.js
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Pagination from './Pagination';

function InternList() {
    const [interns, setInterns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch('http://localhost:8080/interns')
            .then(response => response.json())
            .then(data => setInterns(data))
            .catch(error => console.error('Error fetching interns:', error));
    }, []);

    const pageCount = Math.ceil(interns.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = interns.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="entity-list">
            <h2>Interns List</h2>
            <ul>
                {currentItems.map(intern => (
                    <li key={intern.id}>{intern.name}</li>
                ))}
            </ul>
            <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={paginate} />
        </div>
    );
}

export default InternList;

