import React from 'react';
import { InternPageLayout } from './InternPageLayout';
import CompletedSurveyList from '../components/lists/CompletedSurveyList';

function InternCompletedSurveyPage() {
    return (
        <InternPageLayout>
            <CompletedSurveyList />
        </InternPageLayout>
    );
}

export default InternCompletedSurveyPage;

