import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { fetchTopicPerformance, fetchInterns } from '../../services/Api';
import Separator from "../navigation/Separator";
import '../../styles/list.css';

const TopicPerformanceList = () => {
    const [topicPerformance, setTopicPerformance] = useState({});
    const [interns, setInterns] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topicData = await fetchTopicPerformance();
                setTopicPerformance(topicData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching topic data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchInternsData = async () => {
            try {
                // Fetch all interns and store them in a dictionary by ID
                const internsData = await fetchInterns();
                const internsById = {};
                internsData.forEach(intern => {
                    internsById[intern.id] = intern;
                });
                setInterns(internsById);
            } catch (error) {
                console.error('Error fetching interns data:', error);
            }
        };

        fetchInternsData();
    }, []);

    const fetchInternName = (internId) => {
        const intern = interns[internId];
        return intern ? intern.name : 'N/A';
    };

    const topicPerformanceArray = [];

    for (const internId in topicPerformance) {
        if (topicPerformance.hasOwnProperty(internId)) {
            const topicData = topicPerformance[internId];

            for (const topicName in topicData) {
                if (topicData.hasOwnProperty(topicName)) {
                    const topic = topicData[topicName];

                    topicPerformanceArray.push({
                        internName: fetchInternName(internId),
                        topicName,
                        averageDuration: topic['Average Duration'],
                        averageScore: topic['Average Score'],
                    });
                }
            }
        }
    }

    return (
        <div className="base-style max-width-600">
            <h2 className="list-title">Topic Performance</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataTable
                    data={topicPerformanceArray}
                    columnsToShow={['internName', 'topicName', 'averageScore', 'averageDuration']}
                    columnTitles={{
                        internName: 'Intern',
                        topicName: 'Topic',
                        averageScore: 'Average Score',
                        averageDuration: 'Average Duration',
                    }}
                />
            )}
        </div>
    );
};

export default TopicPerformanceList;

