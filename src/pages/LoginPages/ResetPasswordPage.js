import React from 'react';
import { LoginPageLayout } from "./LoginPageLayout";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

function ResetPasswordPage() {
    return (
        <LoginPageLayout>
            <ResetPasswordForm />
        </LoginPageLayout>
    );
}

export default ResetPasswordPage;
