import React from 'react';
import { InternPageLayout } from './InternPageLayout';
import InternCompletedSurveyDetailsList from '../components/lists/InternCompletedSurveyDetailsList';

function InternCompletedSurveyDetailsPage() {
    return (
        <InternPageLayout>
            <InternCompletedSurveyDetailsList />
        </InternPageLayout>
    );
}

export default InternCompletedSurveyDetailsPage;
