import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


const AnalyticsButton: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0();

    const handleCallApi = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log(token)
            const response = await axios.get("http://localhost:4003/analytics", {
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
        <div>
            <button
                onClick={handleCallApi}
                className='bg-blue-500 text-white hover:bg-blue-700 rounded-md px-4 py-2'
            >
                Call API
            </button>

        </div>

    );
};

export default AnalyticsButton;
