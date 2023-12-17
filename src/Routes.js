import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/GuestPages/HomePage';
import LoginPage from './pages/LoginPages/LoginPage';
import InternHomePage from "./pages/InternAccountPages/InternAvailableSurveyPage";
import RegisterPage from "./pages/LoginPages/RegisterPage";
import ActivateInternPage from "./pages/InternAccountPages/ActivateInternPage";
import ForgotPasswordPage from "./pages/LoginPages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/LoginPages/ResetPasswordPage";
import InternPathwaysPage from "./pages/InternAccountPages/InternCompletedSurveyPage"
import DeactivateInternPage from "./pages/InternAccountPages/DeactivateInternPage";
import AccountSettingsForm from "./components/forms/AccountSettingsForm";
import AccountSettingsPage from "./pages/InternAccountPages/AccountSettingsPage";
import InternAvailableSurveyPage from "./pages/InternAccountPages/InternAvailableSurveyPage";
import InternCompletedSurveyPage from "./pages/InternAccountPages/InternCompletedSurveyPage";
import InternAllSurveyPage from "./pages/InternAccountPages/InternAllSurveyPage";
import TakeSurveyPage from "./pages/InternAccountPages/TakeSurveyPage";
import ConfirmTakeSurveyPage from "./pages/InternAccountPages/ConfirmTakeSurveyPage";
import InternStatisticsChart from "./components/charts/InternStatisticsChart";
import InternStatisticsPage from "./pages/InternAccountPages/InternStatisticsPage";
import InternCompletedSurveyDetailsList from "./components/lists/InternCompletedSurveyDetailsList";
import InternCompletedSurveyDetailsPage from "./pages/InternAccountPages/InternCompletedSurveyDetailsPage";

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
            <Route path="/completed-assessments-details/:intern_id/:survey_id" element={<InternCompletedSurveyDetailsPage />} />

            <Route path="/confirm-take-assessment/:survey_id" element={<ConfirmTakeSurveyPage />} />
            <Route path="/take-assessment/:survey_id" element={<TakeSurveyPage />} />
                <Route path="/statistics" element={<InternStatisticsPage />} />
        </Routes>
    );
}

export default AppRoutes;




