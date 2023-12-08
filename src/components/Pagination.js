import React from 'react';

function Pagination({ currentPage, pageCount, onPageChange }) {
    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
            )}
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
                <a
                    key={number}
                    onClick={() => onPageChange(number)}
                    href="#"
                    className={currentPage === number ? "active" : ""}
                >
                    {number}
                </a>
            ))}
            {currentPage < pageCount && (
                <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
            )}
        </div>
    );
}

export default Pagination;
