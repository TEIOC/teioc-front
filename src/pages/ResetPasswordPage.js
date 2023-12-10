import React from 'react';
import NavBar from "../components/common/NavBar";
import Separator from "../components/common/Separator";
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