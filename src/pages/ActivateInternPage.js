import { React, useState } from 'react';
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";
import ActivateInternForm from "../components/forms/ActivateInternForm";
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/AuthService';

function ActivateInternPage() {
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
            <ActivateInternForm />
        </div>
    );
}

export default ActivateInternPage;