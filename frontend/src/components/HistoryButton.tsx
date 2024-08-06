import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HistoryButtonProps {
    onClick: () => void;
}

const HistoryButton: React.FC<HistoryButtonProps> = ({ onClick }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/history');
        onClick(); // Close the menu
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
