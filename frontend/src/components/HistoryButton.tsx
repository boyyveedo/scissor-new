import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const HistoryButton: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0();

    const handleCallProtected = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log(token)
            const response = await axios.get("http://localhost:4003/history", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include Auth0 access token
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error calling protected API:", error);
        }
    };

    return (
        <button
            onClick={handleCallProtected}
            className='bg-blue-500 text-white hover:bg-blue-700 rounded-md px-4 py-2'
        >
            Call Protected
        </button>
    );
};

export default HistoryButton;
