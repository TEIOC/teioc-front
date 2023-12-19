import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { fetchTopicPerformance } from '../../services/Api';
import Separator from "../navigation/Separator";
import '../../styles/list.css';

const TopicPerformanceList = () => {
    const [topicPerformance, setTopicPerformance] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topicData = await fetchTopicPerformance();
                setTopicPerformance(topicData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const topicPerformanceArray = Object.keys(topicPerformance).map((internId) => {
        const topicData = topicPerformance[internId];
        return Object.keys(topicData).map((topicName) => ({
            internId: internId,
            topicName: topicName,
            averageDuration: topicData[topicName]['Average Duration'],
            averageScore: topicData[topicName]['Average Score'],
        }));
    }).flat();

    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Topic Performance</h2>
                <DataTable
                    data={topicPerformanceArray}
                    columnsToShow={['internId', 'topicName', 'averageScore', 'averageDuration']}
                    columnTitles={{
                        internId: 'Intern ID',
                        topicName: 'Topic Name',
                        averageScore: 'Average Score',
                        averageDuration: 'Average Duration',
                    }}
                />
        </div>
    );
};

export default TopicPerformanceList;
