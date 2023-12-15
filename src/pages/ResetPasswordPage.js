import { React, useState } from 'react';
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/AuthService';

function ResetPasswordPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        logout();
        navigate("/login");
    };

    return (
        <div>
            <Separator />
            <ResetPasswordForm />
        </div>
    );
}

export default ResetPasswordPage;