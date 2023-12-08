import React, {useState} from 'react';
import NavBar from "../../components/NavBar";
import Separator from "../../components/Separator";
import SurveyWithTopicList from "../../components/SurveyWithTopicList";

function InternHomePage({ internName }) {
    const [isLoggedIn] = useState(true);
    return (
        <div className="home-page">
            <NavBar isLoggedIn={isLoggedIn} />
            <Separator />
            <SurveyWithTopicList />
        </div>
    );
}

export default InternHomePage;
