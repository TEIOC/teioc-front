import React from 'react';
import { InternPageLayout } from './InternPageLayout';
import InternStatisticsChart from '../../components/charts/InternStatisticsChart';

function InternStatisticsPage() {
    return (
        <InternPageLayout>
            <InternStatisticsChart />
        </InternPageLayout>
    );
}

export default InternStatisticsPage;