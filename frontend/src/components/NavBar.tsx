// src/components/Navbar.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import SignUpButton from './SignupButton';
import AnalyticsButton from './AnalyticsButton';
import HistoryButton from './HistoryButton'; // Correct import path
import LogoutButton from './LogoutButton';

interface LinkClassParams {
    isActive: boolean;
}

const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuth0();

    const linkClass = ({ isActive }: LinkClassParams) =>
        isActive
            ? 'hit text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            : 'text-black hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2';

    return (
        <nav className='bg-white-700 text-black'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                        <div className='flex flex-shrink-0 justify-center align-center gap-[30px] items-center mr-4'>
                            <img className='logo my-[auto] h-10 w-auto' alt='Scissor' />
                            <div className='text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                <AnalyticsButton />
                            </div>
                            <div className='text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                <HistoryButton />
                            </div>
                        </div>
                        <div className='md:ml-auto'>
                            <div className='flex space-x-2'>
                                {!isAuthenticated && (
                                    <>
                                        <div className='hit text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                            <LoginButton />
                                        </div>
                                        <div className='hit text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                            <SignUpButton />
                                        </div>
                                    </>
                                )}
                                {isAuthenticated && (
                                    <div className='hit text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                        <LogoutButton />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
