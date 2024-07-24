import React from 'react';
import axios from 'axios';

const AnalyticsButton: React.FC = () => {
    const handleCallApi = async () => {
        try {
            const response = await axios.get("http://localhost:4003");
            console.log(response.data);
        } catch (error) {
            console.error("Error calling API:", error);
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
