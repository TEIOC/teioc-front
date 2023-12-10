import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import NavBar from "../../components/NavBar";
import Separator from "../../components/Separator";

function LoginPage() {
    const navigate = useNavigate();

    const handleLoginSuccess = (userData) => {
        navigate('/intern-home', { state: { internName: userData.name } });
    };

    return (
    <div>
        <NavBar/>
        <Separator />
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default LoginPage;

