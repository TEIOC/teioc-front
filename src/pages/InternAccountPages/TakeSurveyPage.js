import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navigation/NavBar";
import Separator from "../../components/navigation/Separator";
import AvailableSurveyList from "../../components/lists/AvailableSurveyList";
import InternHomeSidebar from "../../components/navigation/InternHomeSidebar";
import { logout } from "../../services/AuthService";
import AllSurveyList from "../../components/lists/AllSurveyList";
import TakeSurveyForm from "../../components/forms/TakeSurveyForm";
function TakeSurveyPage({ internName }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        logout();
        navigate("/login");
    };

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Separator />
            <div className="layout-container">
                <InternHomeSidebar />
                <div className="content-area">
                    <TakeSurveyForm />
                </div>
            </div>
        </div>
    );
}

export default TakeSurveyPage;