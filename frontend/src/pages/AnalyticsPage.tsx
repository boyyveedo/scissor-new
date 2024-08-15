import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

interface AnalyticsEntry {
    _id: string;
    shortId: string; // Use shortId as per backend response
    referrer: string;
    userAgent: string;
    ipAddress: string;
    createdAt: string;
    updatedAt: string;
    destination: string; // Ensure destination is available
}

interface AggregatedAnalytics {
    shortUrlId: string; // This should match what you're using in the backend response
    totalClicks: number;
    uniqueReferrers: string[];
    ipAddresses: string[];
    destination: string;
}

const AnalyticsPage: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [analytics, setAnalytics] = useState<AnalyticsEntry[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get('https://scissor-456p.onrender.com/analytics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Handle the data structure with analyticsData property
            if (response.data && Array.isArray(response.data.analyticsData)) {
                setAnalytics(response.data.analyticsData);
            } else {
                console.warn('Unexpected data structure:', response.data);
                setAnalytics([]); // Set to empty array if unexpected structure
            }
        } catch (err) {
            console.error('Error fetching analytics:', err);
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, [getAccessTokenSilently]);

    // Processing and rendering logic
    // Ensure you use the correct field names from the response
    const aggregatedAnalytics = analytics.reduce<Record<string, AggregatedAnalytics>>((acc, entry) => {
        const shortId = entry.shortId;

        if (!acc[shortId]) {
            acc[shortId] = {
                shortUrlId: shortId,
                totalClicks: 0,
                uniqueReferrers: [],
                ipAddresses: [],
                destination: entry.destination, // Make sure destination is populated
            };
        }
        acc[shortId].totalClicks += 1;

        // Use a Set to gather unique referrers
        const uniqueReferrersSet = new Set(acc[shortId].uniqueReferrers);
        uniqueReferrersSet.add(entry.referrer);
        acc[shortId].uniqueReferrers = Array.from(uniqueReferrersSet);

        // Use a Set to gather unique IP addresses
        const uniqueIpAddressesSet = new Set(acc[shortId].ipAddresses);
        uniqueIpAddressesSet.add(entry.ipAddress);
        acc[shortId].ipAddresses = Array.from(uniqueIpAddressesSet);

        return acc;
    }, {});
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(aggregatedAnalytics).length > 0 ? (
                    Object.values(aggregatedAnalytics).map((item) => (
                        <div
                            key={item.shortUrlId}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
                        >
                            <h2 className="text-xl font-semibold">Original URL: {item.destination}</h2>
                            <p className="mt-2">Total Clicks: {item.totalClicks}</p>
                            <p className="mt-2">Unique Referrers: {item.uniqueReferrers.join(', ')}</p>
                        </div>
                    ))
                ) : (
                    <p>No analytics data available.</p>
                )}
            </div>
        </div>
    );
}

export default AnalyticsPage;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth0 } from '@auth0/auth0-react';

// interface AnalyticsEntry {
//     _id: string;
//     shortId: string;
//     referrer: string;
//     userAgent: string;
//     ipAddress: string;
//     createdAt: string;
//     updatedAt: string;
// }

// interface AggregatedAnalytics {
//     shortUrlId: string;
//     totalClicks: number;
//     uniqueReferrers: string[];
//     ipAddresses: string[]; // Add a field for storing unique IP addresses
// }

// const AnalyticsPage: React.FC = () => {
//     const { getAccessTokenSilently } = useAuth0();
//     const [analytics, setAnalytics] = useState<AnalyticsEntry[]>([]);
//     const [error, setError] = useState<Error | null>(null);
//     const [loading, setLoading] = useState(true);

//     const fetchAnalytics = async () => {
//         try {
//             const token = await getAccessTokenSilently();
//             const response = await axios.get('https://scissor-456p.onrender.com/analytics', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             console.log(response.data); // Log response data to check its structure

//             // Adjust to handle the data structure you received
//             if (response.data && Array.isArray(response.data.analyticsData)) {
//                 setAnalytics(response.data.analyticsData);
//             } else {
//                 console.warn('Unexpected data structure:', response.data);
//                 setAnalytics([]); // Set to empty array if unexpected structure
//             }
//         } catch (err) {
//             console.error('Error fetching analytics:', err);
//             setError(err as Error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchAnalytics();
//     }, [getAccessTokenSilently]);

//     if (loading) return <p>Loading...</p>;

//     if (error) return <p>Error loading analytics: {error.message}</p>;

//     // Count total clicks, unique referrers, and IP addresses
//     const aggregatedAnalytics = analytics.reduce<Record<string, AggregatedAnalytics>>((acc, entry) => {
//         if (!acc[entry.shortId]) {
//             acc[entry.shortId] = {
//                 shortUrlId: entry.shortId,
//                 totalClicks: 0,
//                 uniqueReferrers: [],
//                 ipAddresses: [], // Initialize IP addresses list
//             };
//         }
//         acc[entry.shortId].totalClicks += 1;

//         // Use a Set to gather unique referrers
//         const uniqueReferrersSet = new Set(acc[entry.shortId].uniqueReferrers);
//         uniqueReferrersSet.add(entry.referrer);

//         acc[entry.shortId].uniqueReferrers = Array.from(uniqueReferrersSet);

//         // Use a Set to gather unique IP addresses
//         const uniqueIpAddressesSet = new Set(acc[entry.shortId].ipAddresses);
//         uniqueIpAddressesSet.add(entry.ipAddress);

//         acc[entry.shortId].ipAddresses = Array.from(uniqueIpAddressesSet);

//         return acc;
//     }, {});

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {Object.values(aggregatedAnalytics).length > 0 ? (
//                     Object.values(aggregatedAnalytics).map((item) => (
//                         <div
//                             key={item.shortUrlId}
//                             className="bg-white rounded-lg shadow-md p-4 flex flex-col"
//                         >
//                             <h2 className="text-xl font-semibold">Short URL ID: {item.shortUrlId}</h2>
//                             <p className="mt-2">Total Clicks: {item.totalClicks}</p>
//                             <p className="mt-2">Unique Referrers: {item.uniqueReferrers.join(', ')}</p>
//                             <p className="mt-2">IP Addresses: {item.ipAddresses.join(', ')}</p> {/* Display IP addresses */}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No analytics data available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AnalyticsPage;















// import React, { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const AnalyticsPage: React.FC = () => {
//     const { getAccessTokenSilently } = useAuth0();
//     const [analyticsData, setAnalyticsData] = useState<any[]>([]);
//     const [chartData, setChartData] = useState<any>({});
//     const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         const fetchAnalytics = async () => {
//             try {
//                 const token = await getAccessTokenSilently();
//                 const response = await axios.get('https://scissor-456p.onrender.com/analytics', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setAnalyticsData(response.data.analyticsData);
//                 processChartData(response.data.analyticsData);
//             } catch (error) {
//                 console.error('Error fetching analytics:', error);
//             }
//         };

//         fetchAnalytics();

//         const id = setInterval(fetchAnalytics, 5000); // Fetch data every 5 seconds
//         setIntervalId(id);

//         return () => {
//             if (intervalId) clearInterval(intervalId);
//         };
//     }, [getAccessTokenSilently]);

//     const processChartData = (data: any[]) => {
//         const labels = data.map(item => new Date(item.timestamp).toLocaleDateString());
//         const clickCounts = data.map(item => Number(item.clicks) || 0); // Ensure clicks is a number

//         setChartData({
//             labels,
//             datasets: [
//                 {
//                     label: 'Clicks',
//                     data: clickCounts,
//                     backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     borderWidth: 1,
//                 },
//             ],
//         });
//     };

//     const aggregateData = (data: any[]) => {
//         if (data.length === 0) return {};

//         // Example aggregation: take the first item's fields as the representative data
//         const aggregatedData = { ...data[0] };

//         // Aggregate clicks or other fields as needed
//         aggregatedData.clicks = data.reduce((sum, item) => sum + Number(item.clicks || 0), 0);

//         return aggregatedData;
//     };

//     const aggregatedData = aggregateData(analyticsData);

//     const chartOptions = {
//         maintainAspectRatio: false,
//         animation: { duration: 2000 },
//         plugins: {
//             tooltip: {
//                 callbacks: {
//                     label: function (tooltipItem: any) {
//                         const item = analyticsData[tooltipItem.dataIndex];
//                         return [
//                             `Short URL: ${item.shortId || 'N/A'}`,
//                             `Original URL: ${item.originalUrl || 'N/A'}`,
//                             `Clicks: ${item.clicks || 0}`,
//                             `Referrer: ${item.referrer || 'N/A'}`,
//                             `User Agent: ${item.userAgent || 'N/A'}`,
//                             `IP Address: ${item.ipAddress || 'N/A'}`,
//                             `Timestamp: ${item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}`
//                         ];
//                     }
//                 }
//             }
//         }
//     };

//     return (
//         <div className="analytics-page">
//             <h1>Analytics</h1>
//             <div className="chart-container">
//                 {chartData && chartData.labels ? (
//                     <Bar data={chartData} options={chartOptions} />
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </div>
//             <div className="card-container">
//                 {aggregatedData ? (
//                     <div className="card">
//                         <h2>Short URL: {aggregatedData.shortId || 'N/A'}</h2>
//                         <p>Original URL: {aggregatedData.originalUrl || 'N/A'}</p>
//                         <p>Clicks: {aggregatedData.clicks || 0}</p>
//                         <p>Referrer: {aggregatedData.referrer || 'N/A'}</p>
//                         <p>User Agent: {aggregatedData.userAgent || 'N/A'}</p>
//                         <p>IP Address: {aggregatedData.ipAddress || 'N/A'}</p>
//                         <p>Timestamp: {aggregatedData.timestamp ? new Date(aggregatedData.timestamp).toLocaleString() : 'N/A'}</p>
//                     </div>
//                 ) : (
//                     <p>No data available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AnalyticsPage;