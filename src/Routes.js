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
import GuestStatisticsPage from "./pages/GuestPages/GuestStatisticsPage";
import ProtectedRoute from './services/ProtectedRoute';
import PublicRoute from './services/PublicRoute';

function AppRoutes() {
    return (
        <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
            <Route path="/guest-statistics" element={<PublicRoute><GuestStatisticsPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path='/activate/:id' element={<PublicRoute><ActivateInternPage /></PublicRoute>} />
            <Route path='/deactivate/:id' element={<PublicRoute><DeactivateInternPage /></PublicRoute>} />
            <Route path='/forgot-password' element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
            <Route path='/reset-password/:id' element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />

            {/* Routes protégées */}
            <Route path="/account-settings" element={<ProtectedRoute><AccountSettingsPage /></ProtectedRoute>} />
            <Route path="/assessments" element={<ProtectedRoute><InternAllSurveyPage /></ProtectedRoute>} />
            <Route path="/available-assessments" element={<ProtectedRoute><InternAvailableSurveyPage /></ProtectedRoute>} />
            <Route path="/completed-assessments" element={<ProtectedRoute><InternCompletedSurveyPage /></ProtectedRoute>} />
            <Route path="/completed-assessments-details/:intern_id/:survey_id" element={<ProtectedRoute><InternCompletedSurveyDetailsPage /></ProtectedRoute>} />
            <Route path="/confirm-take-assessment/:survey_id" element={<ProtectedRoute><ConfirmTakeSurveyPage /></ProtectedRoute>} />
            <Route path="/take-assessment/:survey_id" element={<ProtectedRoute><TakeSurveyPage /></ProtectedRoute>} />
            <Route path="/statistics" element={<ProtectedRoute><InternStatisticsPage /></ProtectedRoute>} />
        </Routes>
    );
}

export default AppRoutes;




