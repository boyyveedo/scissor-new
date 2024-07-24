import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_ENDPOINTS } from '../config';

const URLShortForm: React.FC = () => {
    const [destination, setDestination] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<{
        shortId: string;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setShortUrl(null);
        setError(null);

        if (!destination) {
            setError('Please enter a URL');
            return;
        }

        if (!isValidUrl(destination)) {
            setError('Please enter a valid URL');
            return;
        }

        try {
            const result = await axios.post(`${SERVER_ENDPOINTS}/shorten`, {
                destination,
            });
            setShortUrl(result.data.newUrl); // Assuming 'newUrl' contains { shortId: string }
            setDestination(`http://localhost:4003/${result.data.newUrl.shortId}`);
        } catch (err: any) {
            console.error('Error:', err.response ? err.response.data : err.message);
            setError('Failed to shorten the URL. Please try again.');
        }
    }

    function isValidUrl(url: string): boolean {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))' + // domain name and extension
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!urlPattern.test(url);
    }

    return (
        <div className="shortener relative z-10 bg-white p-6 shadow-md rounded-md">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="url"
                        value={destination}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDestination(e.target.value)}
                        placeholder="https://scissor.com"
                        className="flex-1 px-4 py-2 border rounded-md"
                    />
                    <button type="submit" className="px-4 py-2 hit text-white rounded-md">
                        Shorten It!
                    </button>
                </div>
            </form>
            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
}

export default URLShortForm;
