import React, { useState } from 'react';
import NavBar from "../../components/navigation/NavBar";
import Separator from "../../components/navigation/Separator";
import GuestHomeSidebar from "../../components/navigation/GuestHomeSidebar";

export const GuestPageLayout = ({ children }) => {
    const isLoggedIn = false;
    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} />
            <Separator />
            <div className="layout-container">
                <GuestHomeSidebar />
                <div className="content-container">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default GuestPageLayout;
