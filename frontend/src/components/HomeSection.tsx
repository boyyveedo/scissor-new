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
                <div className="site-desc flex flex-col justify-center gap-6 lg:gap-5 px-6 lg:px-0 slide-in">
                    <h1 className="title text-1xl text-center lg:text-left">
                        Effortlessly short your URL🔗 with ease🌐
                    </h1>
                    <p className="subtitle text-center lg:text-left">
                        Shorten your URL for easy sharing on social media, email, text messages, <br /> and more. Test it below and experience the convenience.
                    </p>
                    <NavLink to='/add-job' className='call text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
                        Start for free
                    </NavLink>
                </div>
            </div>
        </section>
    );
};
