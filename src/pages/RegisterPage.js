import React from 'react';
import NavBar from "../components/common/NavBar";
import Separator from "../components/common/Separator";
import RegisterForm from "../components/forms/RegisterForm";

function RegisterPage() {
    return (
        <div>
            <NavBar/>
            <Separator />
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;