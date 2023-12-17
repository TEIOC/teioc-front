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
import DeactivateInternPage from "./pages/DeactivateInternPage";
import AccountSettingsForm from "./components/forms/AccountSettingsForm";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import InternAvailableSurveyPage from "./pages/InternAvailableSurveyPage";
import InternCompletedSurveyPage from "./pages/InternCompletedSurveyPage";
import InternAllSurveyPage from "./pages/InternAllSurveyPage";
import TakeSurveyPage from "./pages/TakeSurveyPage";
import ConfirmTakeSurveyPage from "./pages/ConfirmTakeSurveyPage";
import InternStatisticsChart from "./components/charts/InternStatisticsChart";
import InternStatisticsPage from "./pages/InternStatisticsPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/activate/:id' element={<ActivateInternPage />} />
            <Route path='/deactivate/:id' element={<DeactivateInternPage/>} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password/:id' element={<ResetPasswordPage />} />
            <Route path="/account-settings" element={<AccountSettingsPage />} />
            <Route path="/assessments" element={<InternAllSurveyPage />} />
            <Route path="/available-assessments" element={<InternAvailableSurveyPage />} />
            <Route path="/completed-assessments" element={<InternCompletedSurveyPage />} />
            <Route path="/confirm-take-assessment/:survey_id" element={<ConfirmTakeSurveyPage />} />
            <Route path="/take-assessment/:survey_id" element={<TakeSurveyPage />} />
                <Route path="/statistics" element={<InternStatisticsPage />} />
        </Routes>
    );
}

export default AppRoutes;




