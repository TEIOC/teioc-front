import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default AppRoutes; // Export the component




