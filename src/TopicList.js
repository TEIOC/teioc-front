// TopicList.js
import React, { useState, useEffect } from 'react';

function TopicList() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/topics')
            .then(response => response.json())
            .then(data => setTopics(data))
            .catch(error => console.error('Error fetching topics:', error));
    }, []);

    return (
        <div>
            <h2>Liste des Sujets</h2>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>{topic.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TopicList;
