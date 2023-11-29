// HomePage.js
import React from 'react';
import InternList from '../../components/InternList';
import TopicList from '../../components/TopicList';
import NavBar from '../../components/NavBar';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <NavBar/>
            <div className="list-separator"></div>
            <TopicList />
            <div className="list-separator"></div>
            <InternList />
        </div>
    );
}

// css for this file


export default HomePage;
