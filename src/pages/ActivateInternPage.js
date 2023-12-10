import React from 'react';
import NavBar from "../components/common/NavBar";
import Separator from "../components/common/Separator";
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