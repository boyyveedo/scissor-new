import React from 'react';
import { NavLink } from 'react-router-dom';
import heroImage from '../images/illustration-working.svg';

export const HomeSection: React.FC = () => {
    return (
        <section className="hero py-6 lg:pt-7">
            <div className='hero-inner grid gap-7 lg:gap-0 grid-cols-1 lg:grid-cols-2'>
                <picture className="hero-image flex justify-center lg:justify-start pl-6 lg:pl-0">
                    <img src={heroImage} alt="Hero" className="h-auto max-w-full slide-in" />
                </picture>
                <div className="site-desc flex flex-col justify-center items-center lg:items-start gap-6 lg:gap-5 px-6 lg:px-0 slide-in">
                    <h1 className="title text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left">
                        Effortlessly shorten your URL🔗 with ease
                    </h1>
                    <p className="subtitle text-center lg:text-left text-base md:text-lg lg:text-xl">
                        Shorten your URL for easy sharing on social media, email, text messages,
                        <br className="hidden lg:block" />
                        and more. Test it below and experience the convenience.
                    </p>
                    <NavLink to='/add-job' className='call bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white rounded-md px-4 py-2 text-center hidden lg:inline-block'>
                        Start for free
                    </NavLink>
                </div>
            </div>
        </section>
    );
};
