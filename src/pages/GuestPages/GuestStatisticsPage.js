import React from 'react';
import GuestPageLayout from './GuestPageLayout';
import GuestStatisticsList from "../../components/lists/GuestStatisticsList";

function GuestStatisticsPage() {
    return (
        <GuestPageLayout>
            <div>
                <h1>Hello, GuestStatisticsPage!</h1>
                <GuestStatisticsList />
            </div>
        </GuestPageLayout>
    );
}

export default GuestStatisticsPage;
