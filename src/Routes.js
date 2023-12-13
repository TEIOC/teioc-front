import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import InternHomePage from "./pages/InternAvailableSurveyPage";
import RegisterPage from "./pages/RegisterPage";
import ActivateInternPage from "./pages/ActivateInternPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import InternPathwaysPage from "./pages/InternCompletedSurveyPage"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/activate/:id' element={<ActivateInternPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password/:id' element={<ResetPasswordPage />} />
            <Route path="/intern-home" element={<InternHomePage />} />
            <Route path="/assessments" element={<InternPathwaysPage />} />

        </Routes>
    );
}

export default AppRoutes;




