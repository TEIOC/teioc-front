// HomePage.js
import React from 'react';
import InternList from '../../components/InternList';
import TopicList from '../../components/TopicList';
import NavBar from '../../components/NavBar';
import Separator from '../../components/Separator';
import SurveyList from '../../components/SurveyList';

function HomePage() {
    return (
        <div className="home-page">
            <NavBar/>
            <Separator />
            <InternList />
            <Separator />
            <TopicList />
            <Separator />
            <SurveyList />
        </div>
    );
}

export default HomePage;
