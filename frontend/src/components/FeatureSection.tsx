import React from 'react';

const FeaturesSection: React.FC = () => {
    return (
        <section className="py-8 text-center">
            <h2 className="text-2xl mb-8">Features</h2>
            <div className="flex justify-around flex-wrap">
                <div className="flex flex-col items-center p-2 shadow-md rounded-md text-center w-48">
                    <img
                        src="https://www.svgrepo.com/show/349464/opensource.svg"
                        alt="Feature 1"
                        className="mb-4 mx-auto w-12 h-12"
                    />
                    <h3 className="text-lg">Heading 1</h3>
                    <p>Amet massa vitae tortor condimentum lacinia quis vel eros donec.</p>
                </div>
                <div className="flex flex-col items-center p-2 shadow-md rounded-md text-center w-48">
                    <img
                        src="https://www.svgrepo.com/show/27183/social-media.svg"
                        alt="Feature 2"
                        className="mb-4 mx-auto w-12 h-12"
                    />
                    <h3 className="text-lg">Heading 2</h3>
                    <p>Amet massa vitae tortor condimentum lacinia quis vel eros donec.</p>
                </div>
                <div className="flex flex-col items-center p-2 shadow-md rounded-md text-center w-48">
                    <img
                        src="https://www.svgrepo.com/show/110858/social-media.svg"
                        alt="Feature 3"
                        className="mb-4 mx-auto w-12 h-12"
                    />
                    <h3 className="text-lg">Heading 3</h3>
                    <p>Amet massa vitae tortor condimentum lacinia quis vel eros donec.</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
