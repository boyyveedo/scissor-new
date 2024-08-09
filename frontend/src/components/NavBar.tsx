import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import SignUpButton from './SignupButton';
import AnalyticsButton from './AnalyticsButton';
import HistoryButton from './HistoryButton';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

interface LinkClassParams {
    isActive: boolean;
}

const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const linkClass = ({ isActive }: LinkClassParams) =>
        isActive
            ? 'hit text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            : 'text-black hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2';

    return (
        <nav className='bg-white text-black relative'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                    <div className='flex items-center justify-between w-full md:flex-1 md:justify-start'>
                        <Link to="/">
                            <img className='logo h-10 w-auto' alt='Scissor' />
                        </Link>
                        <div className='hidden md:flex md:gap-4'>
                            <div className='text-black hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                <AnalyticsButton onClick={closeMenu} />
                            </div>
                            <div className='text-black hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                <HistoryButton onClick={closeMenu} />
                            </div>
                        </div>
                        <div className='hidden md:flex gap-2 md:ml-auto'>
                            {!isAuthenticated ? (
                                <>
                                    <div className='hit text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                        <LoginButton />
                                    </div>
                                    <div className='hit text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                        <SignUpButton />
                                    </div>
                                </>
                            ) : (
                                <div className='hit text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2'>
                                    <LogoutButton />
                                </div>
                            )}
                        </div>
                        <button
                            className='md:hidden text-black focus:outline-none'
                            onClick={toggleMenu}
                        >
                            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
                            </svg>
                        </button>
                    </div>
                </div>
                {menuOpen && (
                    <>
                        {/* Overlay Background */}
                        <div
                            className='fixed inset-0 bg-gray-900 bg-opacity-50 z-40'
                            onClick={closeMenu}
                        ></div>

                        {/* Dropdown Menu */}
                        <div className='fixed top-20 left-0 right-0 bg-white shadow-md border border-gray-200 z-50 flex flex-col items-center py-4'>
                            <button
                                className='absolute top-2 right-2 text-black'
                                onClick={closeMenu}
                            >
                                <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                                </svg>
                            </button>
                            <div className='w-full text-center py-2'>
                                <AnalyticsButton onClick={closeMenu} />
                            </div>
                            <div className='w-full text-center py-2'>
                                <HistoryButton onClick={closeMenu} />
                            </div>
                            {!isAuthenticated ? (
                                <>
                                    <button className='bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 w-1/2 mb-2'>
                                        <SignUpButton />
                                    </button>
                                    <button className='border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-100 w-1/2'>
                                        <LoginButton />
                                    </button>
                                </>
                            ) : (
                                <button className='bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 w-1/2'>
                                    <LogoutButton />
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
