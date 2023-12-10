import React from 'react';
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

function ResetPasswordPage() {
    return (
        <div>
            <NavBar/>
            <Separator />
            <ResetPasswordForm />
        </div>
    );
}

export default ResetPasswordPage;