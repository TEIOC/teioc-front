import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";
import InternHomeSidebar from "../components/navigation/InternHomeSidebar";
import { logout } from "../services/AuthService";
import AccountSettingsForm from "../components/forms/AccountSettingsForm";

function AccountSettingsPage({ internName }) {
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
                    <AccountSettingsForm />
                </div>
            </div>
        </div>
    );
}

export default AccountSettingsPage;