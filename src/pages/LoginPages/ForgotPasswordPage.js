import React from 'react';
import { LoginPageLayout } from "./LoginPageLayout";
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';

function ForgotPasswordPage() {
    return (
        <LoginPageLayout>
            <ForgotPasswordForm />
        </LoginPageLayout>
    );
}

export default ForgotPasswordPage;

