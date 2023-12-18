import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import NavBar from '../../components/navigation/NavBar';
import Separator from '../../components/navigation/Separator';
import InternHomeSidebar from '../../components/navigation/InternHomeSidebar';
import ConfirmTakeSurveyForm from "../../components/forms/ConfirmTakeSurveyForm";
import {logout} from "../../services/AuthService";

function ConfirmTakeSurveyPage() {
    const { survey_id } = useParams();
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
                    <ConfirmTakeSurveyForm survey_id={survey_id} />
                </div>
            </div>
        </div>
    );
}

export default ConfirmTakeSurveyPage;

