import React, {useState} from 'react';
import InternList from '../../components/lists/InternList';
import TopicList from '../../components/lists/TopicList';
import NavBar from "../../components/navigation/NavBar";
import Separator from "../../components/navigation/Separator";
import SurveyList from '../../components/lists/SurveyList';

function HomePage() {
    const [isLoggedIn] = useState(false);
    return (
        <div>
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
