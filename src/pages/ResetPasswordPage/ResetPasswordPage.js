import React from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import NavBar from "../../components/NavBar";
import Separator from "../../components/Separator";
import ResetPasswordForm from "../../components/ResetPasswordForm";

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