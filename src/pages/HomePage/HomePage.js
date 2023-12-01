// HomePage.js
import React from 'react';
import InternList from '../../components/InternList';
import TopicList from '../../components/TopicList';
import NavBar from '../../components/NavBar';
import Seperator from '../../components/Seperator';

function HomePage() {
    return (
        <div className="home-page">
            <NavBar/>
            <Seperator />
            <InternList />
            <Seperator />
            <TopicList />
        </div>
    );
}

// css for this file


export default HomePage;
