import React from 'react';
import { InternPageLayout } from './InternPageLayout';
import AccountSettingsForm from '../components/forms/AccountSettingsForm';

function AccountSettingsPage() {
    return (
        <InternPageLayout>
            <AccountSettingsForm />
        </InternPageLayout>
    );
}

export default AccountSettingsPage;
