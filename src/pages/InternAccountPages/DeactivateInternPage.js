import { React, useState } from 'react';
import NavBar from "../../components/navigation/NavBar";
import Separator from "../../components/navigation/Separator";
import DeactivateInternForm from "../../components/forms/DeactivateInternForm";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/AuthService';

function DeactivateInternPage() {
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
            <DeactivateInternForm />
        </div>
    );
}

export default DeactivateInternPage;