// AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import InternHomePage from "./InternHomePage/InternHomePage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/intern-home" element={<InternHomePage />} />
        </Routes>
    );
}

export default AppRoutes;




