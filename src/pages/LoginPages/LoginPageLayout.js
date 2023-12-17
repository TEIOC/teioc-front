import NavBar from "../../components/navigation/NavBar";
import Separator from "../../components/navigation/Separator";
import React from "react";

export const LoginPageLayout = ({ children }) => {

    return (
        <div>
            <NavBar />
            <Separator />
            <div>
                {children}
            </div>
        </div>
    );
};