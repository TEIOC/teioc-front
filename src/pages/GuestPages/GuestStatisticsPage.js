import React from 'react';
import GuestPageLayout from './GuestPageLayout';
import GuestStatisticsList from "../../components/lists/GuestStatisticsList";
import SurveyPerformanceList from "../../components/lists/SurveyPerformanceList";
import TopicPerformanceList from "../../components/lists/TopicPerformanceList";
import Separator from "../../components/navigation/Separator";

function GuestStatisticsPage() {
    return (
        <GuestPageLayout>
            <div>
                <SurveyPerformanceList/>
                <Separator/>
                <TopicPerformanceList/>
            </div>
        </GuestPageLayout>
    );
}

export default GuestStatisticsPage;
