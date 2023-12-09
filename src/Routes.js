import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import InternHomePage from "./pages/InternHomePage/InternHomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import ActivateInternPage from './pages/ActivateInternPage/ActivateInternPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/intern-home" element={<InternHomePage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password/:id' element={<ResetPasswordPage />} />
            <Route path='/activate/:id' element={<ActivateInternPage />} />
        </Routes>
    );
}

export default AppRoutes;




