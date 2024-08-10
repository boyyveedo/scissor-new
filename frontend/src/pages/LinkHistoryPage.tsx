import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import '../index.css'; // Adjust this path if your folder structure is different


const HistoryPage: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await axios.get('https://scissor-r7t6.onrender.com/history', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (Array.isArray(response.data)) {
                    setHistory(response.data);
                } else {
                    setError('Unexpected response format from the server.');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(`Failed to fetch history: ${error.message}`);
                } else if (error instanceof Error) {
                    setError(`Failed to fetch history: ${error.message}`);
                } else {
                    setError('Failed to fetch history.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [getAccessTokenSilently]);

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopiedUrl(url);
            setTimeout(() => {
                setCopiedUrl(null);
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy URL:', err);
        });
    };

    const handleClearHistory = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.delete('https://scissor-r7t6.onrender.com/history', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setHistory([]);
            } else {
                setError('Failed to clear history.');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(`Failed to clear history: ${error.message}`);
            } else if (error instanceof Error) {
                setError(`Failed to clear history: ${error.message}`);
            } else {
                setError('Failed to clear history.');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="url-history">
            <h1>URL History</h1>

            {copiedUrl && <p className="copy-message">URL copied to clipboard: {copiedUrl}</p>}
            {history.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Shortened URL</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.destination}</td>
                                <td>
                                    <a href={`https://scissor-r7t6.onrender.com/${item.shortId}`} target="_blank" rel="noopener noreferrer">
                                        {`https://scissor-r7t6.onrender.com/${item.shortId}`}
                                    </a>
                                </td>
                                <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}</td>
                                <td>
                                    <button className="copy-button" onClick={() => handleCopy(`https://scissor-r7t6.onrender.com/${item.shortId}`)}>Copy</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            ) : (

                <p>No history available.</p>
            )}
            <button className="url-history-button" onClick={handleClearHistory}>Clear History</button>
        </div>
    );
};

export default HistoryPage;
