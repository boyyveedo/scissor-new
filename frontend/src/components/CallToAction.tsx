import React from 'react';

const CallToAction: React.FC = () => {
    return (
        <section className="bta padding-xy flex flex-col justify-center items-stretch gap-4">
            <h2 className='text-white font-bold text-2xl text-center'>Customise your link now</h2>
            <button type="button" className="bg-indigo-700 btn-cta square self-center">Get Started</button>
        </section>
    );
};

export default CallToAction;
