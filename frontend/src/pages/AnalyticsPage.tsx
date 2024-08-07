import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AnalyticsPage: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any>({});
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await axios.get('http://localhost:4003/analytics', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAnalyticsData(response.data.analyticsData);
                processChartData(response.data.analyticsData);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        };

        fetchAnalytics();

        const id = setInterval(fetchAnalytics, 5000); // Fetch data every 5 seconds
        setIntervalId(id);

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [getAccessTokenSilently]);

    const processChartData = (data: any[]) => {
        const labels = data.map(item => new Date(item.timestamp).toLocaleDateString());
        const clickCounts = data.map(item => Number(item.clicks) || 0); // Ensure clicks is a number

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Clicks',
                    data: clickCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        });
    };

    const aggregateData = (data: any[]) => {
        if (data.length === 0) return {};

        // Example aggregation: take the first item's fields as the representative data
        const aggregatedData = { ...data[0] };

        // Aggregate clicks or other fields as needed
        aggregatedData.clicks = data.reduce((sum, item) => sum + Number(item.clicks || 0), 0);

        return aggregatedData;
    };

    const aggregatedData = aggregateData(analyticsData);

    const chartOptions = {
        maintainAspectRatio: false,
        animation: { duration: 2000 },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const item = analyticsData[tooltipItem.dataIndex];
                        return [
                            `Short URL: ${item.shortId || 'N/A'}`,
                            `Original URL: ${item.originalUrl || 'N/A'}`,
                            `Clicks: ${item.clicks || 0}`,
                            `Referrer: ${item.referrer || 'N/A'}`,
                            `User Agent: ${item.userAgent || 'N/A'}`,
                            `IP Address: ${item.ipAddress || 'N/A'}`,
                            `Timestamp: ${item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}`
                        ];
                    }
                }
            }
        }
    };

    return (
        <div className="analytics-page">
            <h1>Analytics</h1>
            <div className="chart-container">
                {chartData && chartData.labels ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="card-container">
                {aggregatedData ? (
                    <div className="card">
                        <h2>Short URL: {aggregatedData.shortId || 'N/A'}</h2>
                        <p>Original URL: {aggregatedData.originalUrl || 'N/A'}</p>
                        <p>Clicks: {aggregatedData.clicks || 0}</p>
                        <p>Referrer: {aggregatedData.referrer || 'N/A'}</p>
                        <p>User Agent: {aggregatedData.userAgent || 'N/A'}</p>
                        <p>IP Address: {aggregatedData.ipAddress || 'N/A'}</p>
                        <p>Timestamp: {aggregatedData.timestamp ? new Date(aggregatedData.timestamp).toLocaleString() : 'N/A'}</p>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default AnalyticsPage;
