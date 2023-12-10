import React from 'react';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import NavBar from "../components/common/NavBar";
import Separator from "../components/common/Separator";

function ForgotPasswordPage() {
    return (
        <div>
            <NavBar/>
            <Separator />
            <ForgotPasswordForm />
        </div>
    );
}

export default ForgotPasswordPage;
