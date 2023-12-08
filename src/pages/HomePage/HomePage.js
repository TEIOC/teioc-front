import React, {useState} from 'react';
import InternList from '../../components/InternList';
import TopicList from '../../components/TopicList';
import NavBar from '../../components/NavBar';
import Separator from '../../components/Separator';
import SurveyList from '../../components/SurveyList';

function HomePage() {
    const [isLoggedIn] = useState(false);
    return (
        <div className="home-page">
            <NavBar isLoggedIn={isLoggedIn} />
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
