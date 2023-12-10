import React from 'react';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";

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
