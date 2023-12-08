import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import InternHomePage from "./pages/InternHomePage/InternHomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/intern-home" element={<InternHomePage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        </Routes>
    );
}

export default AppRoutes;




