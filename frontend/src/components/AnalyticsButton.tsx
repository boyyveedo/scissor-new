import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';



const AnalyticsButton: React.FC = () => {
    const navigate = useNavigate();

    const handleCallApi = () => {
        navigate('/analytics'); // Navigate to the History page
    };
    return (
        <button
            onClick={handleCallApi}
            className='text-black px-4 py-2'
        >
            Analytics
        </button>
    );
};

export default AnalyticsButton;
