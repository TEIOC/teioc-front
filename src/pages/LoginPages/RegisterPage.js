import React from 'react';
import { LoginPageLayout } from "./LoginPageLayout";
import RegisterForm from "../../components/forms/RegisterForm";

function RegisterPage() {
    return (
        <LoginPageLayout>
            <RegisterForm />
        </LoginPageLayout>
    );
}

export default RegisterPage;
