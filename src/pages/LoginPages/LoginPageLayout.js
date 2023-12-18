import NavBar from "../../components/navigation/NavBar";
import Separator from "../../components/navigation/Separator";
import React from "react";
import GuestHomeSidebar from "../../components/navigation/GuestHomeSidebar";

export const LoginPageLayout = ({ children }) => {

    return (
        <div>
            <NavBar />
            <Separator />
            <GuestHomeSidebar />
            <div>
                {children}
            </div>
        </div>
    );
};