import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Separator from "../../components/Separator";
import SurveyWithTopicList from "../../components/SurveyWithTopicList";

function InternHomePage({ internName }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("userToken");
        navigate('/login');
    };

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Separator />
            <SurveyWithTopicList />
        </div>
    );
}

export default InternHomePage;


