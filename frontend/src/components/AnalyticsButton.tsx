import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AnalyticsButtonProps {
    onClick: () => void;
}

const AnalyticsButton: React.FC<AnalyticsButtonProps> = ({ onClick }) => {
    const navigate = useNavigate();

    const handleCallApi = () => {
        navigate('/analytics');
        onClick(); // Close the menu
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
