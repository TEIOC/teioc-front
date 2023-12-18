import React from 'react';
import GuestPageLayout from './GuestPageLayout'; // Import the GuestPageLayout component
import InternList from '../../components/lists/InternList';
import TopicList from '../../components/lists/TopicList';
import Separator from "../../components/navigation/Separator";
import SurveyList from '../../components/lists/SurveyList';

function HomePage() {
    return (
        <GuestPageLayout>
            <InternList />
            <Separator />
            <TopicList />
            <Separator />
            <SurveyList />
        </GuestPageLayout>
    );
}

export default HomePage;

