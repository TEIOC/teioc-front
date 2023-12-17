import React, { useEffect } from 'react';
import { InternPageLayout } from './InternPageLayout';
import AllSurveyList from '../../components/lists/AllSurveyList';
import { updateLastConnection } from '../../services/Api';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';

function InternAllSurveyPage() {
    const intern = GetLoggedinIntern();

    useEffect(() => {
        if (intern && intern.id) {
            updateLastConnection(intern.id)
                .catch(error => console.error('Error updating last connection:', error));
        }
    }, [intern]);

    return (
        <InternPageLayout>
            <AllSurveyList />
        </InternPageLayout>
    );
}

export default InternAllSurveyPage;
