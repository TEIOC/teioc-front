import React from 'react';
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";
import ActivateInternForm from "../components/forms/ActivateInternForm";

function ActivateInternPage() {
    return (
        <div>
            <NavBar/>
            <Separator />
            <ActivateInternForm />
        </div>
    );
}

export default ActivateInternPage;