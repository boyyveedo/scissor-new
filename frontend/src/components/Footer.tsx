import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-10">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h2 className="text-2xl font-bold">Scissor</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        &copy; {new Date().getFullYear()} Scissor. All rights reserved.
                    </p>
                </div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 4.56c-.88.39-1.83.66-2.82.78a4.92 4.92 0 002.16-2.71 9.84 9.84 0 01-3.12 1.2 4.92 4.92 0 00-8.38 4.48 13.95 13.95 0 01-10.1-5.13 4.92 4.92 0 001.52 6.57 4.92 4.92 0 01-2.23-.61v.06a4.92 4.92 0 003.95 4.83 4.92 4.92 0 01-2.22.08 4.92 4.92 0 004.6 3.42A9.86 9.86 0 010 19.54 13.93 13.93 0 007.56 21c9.06 0 14.01-7.5 14.01-14 0-.21 0-.43-.02-.64A10 10 0 0024 4.56z" />
                        </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.92 4.92 0 002.16-2.71 9.84 9.84 0 01-3.12 1.2 4.92 4.92 0 00-8.38 4.48 13.95 13.95 0 01-10.1-5.13 4.92 4.92 0 001.52 6.57 4.92 4.92 0 01-2.23-.61v.06a4.92 4.92 0 003.95 4.83 4.92 4.92 0 01-2.22.08 4.92 4.92 0 004.6 3.42A9.86 9.86 0 010 19.54 13.93 13.93 0 007.56 21c9.06 0 14.01-7.5 14.01-14 0-.21 0-.43-.02-.64A10 10 0 0022.46 6z" />
                        </svg>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2.04c-5.5 0-9.96 4.45-9.96 9.96 0 4.41 2.85 8.14 6.84 9.47.5.09.68-.22.68-.49v-1.71c-2.79.61-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.93.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.02a9.51 9.51 0 015.01 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.42.2 2.47.1 2.73.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.75c0 .27.18.59.69.49 4-1.33 6.84-5.06 6.84-9.47 0-5.51-4.46-9.96-9.96-9.96z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
