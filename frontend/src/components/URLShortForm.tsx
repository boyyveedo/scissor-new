import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_ENDPOINTS } from '../config';

const URLShortForm: React.FC = () => {
    const [destination, setDestination] = useState<string>('');
    const [customAlias, setCustomAlias] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<{ shortId: string; } | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setShortUrl(null);
        setQrCodeUrl(null);
        setError(null);

        if (!destination) {
            setError('Input is empty');
            return;
        }

        if (!isValidUrl(destination)) {
            setError('Please enter a valid URL');
            return;
        }

        try {
            const result = await axios.post(`${SERVER_ENDPOINTS}/shorten`, {
                destination,
                customAlias,
            });
            setShortUrl(result.data.newUrl); // Assuming 'newUrl' contains { shortId: string }
            setDestination(" ");
        } catch (err: any) {
            console.error('Error:', err.response ? err.response.data : err.message);
            setError('Failed to shorten the URL. Please try again.');
        }
    }

    async function handleGenerateQR() {
        if (shortUrl) {
            try {
                const qrResult = await axios.get(`${SERVER_ENDPOINTS}/generate`, {
                    params: {
                        data: `http://localhost:4003/${shortUrl.shortId}`
                    },
                    responseType: 'blob' // Important to handle binary data
                });

                const qrCodeUrl = URL.createObjectURL(qrResult.data);
                setQrCodeUrl(qrCodeUrl); // Create a URL for the QR code image blob
            } catch (err: any) {
                console.error('Error generating QR code:', err.response ? err.response.data : err.message);
                setError('Failed to generate QR code. Please try again.');
            }
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

    function handleCopy() {
        if (shortUrl) {
            navigator.clipboard.writeText(`http://localhost:4003/${shortUrl.shortId}`);
        }
    }

    return (
        <div>
            <div className="shortener relative z-10 p-6 shadow-md rounded-md bg-white" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="url"
                            value={destination}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDestination(e.target.value)}
                            placeholder="https://scissor.com"
                            className="flex-1 px-4 py-2 border rounded-md"
                        />
                        <input
                            type="text"
                            value={customAlias}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomAlias(e.target.value)}
                            placeholder="Custom Alias (optional)"
                            className="flex-1 px-4 py-2 border rounded-md"
                        />
                        <button type="submit" className="px-4 py-2 bg-indigo-700 text-white rounded-md">
                            Trim!
                        </button>
                    </div>
                </form>
            </div>

            {shortUrl && (
                <div className="flex flex-col items-center justify-center bg-grey text-center mt-4">
                    <div className="flex items-center justify-between">
                        <a href={`http://localhost:4003/${shortUrl.shortId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">
                            {`http://localhost:4003/${shortUrl.shortId}`}
                        </a>
                        <button onClick={handleCopy} className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md ml-2 text-xs">
                            Copy
                        </button>
                    </div>
                    <button onClick={handleGenerateQR} className="mt-2 px-2 py-1 bg-green-500 text-white rounded-md text-xs">
                        Generate QR
                    </button>
                </div>
            )}

            {qrCodeUrl && (
                <div className="flex flex-col items-center justify-center bg-grey text-center mt-4">
                    <img src={qrCodeUrl} alt="QR Code" className="max-w-full h-auto" />
                    <a href={qrCodeUrl} className="block text-blue-500 mt-2 text-xs" download="qrcode.png">
                        Download QR Code
                    </a>
                </div>
            )}

            {error && (
                <div className="mt-4 text-red-500 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
}

export default URLShortForm;
