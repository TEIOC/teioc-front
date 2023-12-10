import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Separator from "../../components/Separator";
import SurveyWithTopicList from "../../components/SurveyWithTopicList";
import InternHomeSidebar from "../../components/InternHomeSidebar";

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
            <div className="layout-container">
                <InternHomeSidebar />
                <div className="content-area">
                    <SurveyWithTopicList />
                </div>
            </div>
        </div>
    );
}

export default InternHomePage;


