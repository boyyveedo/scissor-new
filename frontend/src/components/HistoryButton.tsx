// src/components/HistoryButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryButton: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/history'); // Navigate to the History page
    };

    return (
        <button
            onClick={handleNavigation}
            className='text-black px-4 py-2'
        >
            Link History
        </button>
    );
};

export default HistoryButton;
