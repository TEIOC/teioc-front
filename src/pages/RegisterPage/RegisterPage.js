import React from 'react';
import NavBar from "../../components/NavBar";
import Separator from "../../components/Separator";
import RegisterForm from "../../components/RegisterForm";

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