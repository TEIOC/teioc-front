import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();

    const handleLoginSuccess = (userData) => {
        navigate('/intern-home', { state: { internName: userData.name } });
    };

    return (
        <div className="login-page">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default LoginPage;
