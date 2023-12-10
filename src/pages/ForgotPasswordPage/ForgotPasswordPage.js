import React from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import NavBar from "../../components/NavBar";
import Separator from "../../components/Separator";

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
