import React from 'react';
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";
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