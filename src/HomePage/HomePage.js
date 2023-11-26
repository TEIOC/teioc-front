import React from 'react';
import InternList from './InternList';
import TopicList from './TopicList';
import HeaderBanner from './HeaderBanner';
import './HomePage.css';
import { Link } from 'react-router-dom';
function HomePage() {

    return (
        <div className="home-page">
            <HeaderBanner/>
            <div className="list-separator"></div>
            <TopicList />
            <div className="list-separator"></div>
            <InternList />
        </div>
    );
}

export default HomePage;
