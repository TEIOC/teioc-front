import React from 'react';
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";
import DeactivateInternForm from "../components/forms/DeactivateInternForm";

function DeactivateInternPage() {
    return (
        <div>
            <NavBar />
            <Separator />
            <DeactivateInternForm />
        </div>
    );
}

export default DeactivateInternPage;