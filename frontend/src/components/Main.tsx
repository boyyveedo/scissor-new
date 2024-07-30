import React, { useState, useEffect } from "react";
import CallToAction from "./CallToAction";
import { TiDeleteOutline } from "react-icons/ti";
import UrlList from "./UrlList";
import URLShortForm from "./URLShortForm";

// Define the type for a single link object
interface Link {
    url: string;
    shortUrl: string;
}

// Define the type for the return value of getLocalStorage
const getLocalStorage = (): Link[] => {
    const links = localStorage.getItem('links');
    return links ? JSON.parse(links) : [];
};

const Main: React.FC = () => {
    const [links, setLinks] = useState<Link[]>(getLocalStorage);

    useEffect(() => {
        localStorage.setItem('links', JSON.stringify(links));
    }, [links]);

    const addLink = (newItem: Link) => {
        setLinks([...links, newItem]);
    };

    const hideLinks = () => {
        setLinks([]);
    };

    return (
        <main>
            <URLShortForm />
            <UrlList urlList={links} />
            <div className="flex justify-center">
                {links.length > 0 && <TiDeleteOutline className="btn-cross" onClick={hideLinks} />}
            </div>
            <section className="stats pb-11 lg:pb-20">
                <div className="mb-8">
                    <h3 className="title pb-2">Explore Scissor</h3>
                    <p className="subtitle pb-2">Scissor reliably creates custom URLs, QR codes, and provides advanced analytics to track click performance.</p>
                </div>

                <div className="flex justify-around flex-wrap">
                    <div className="flex flex-col items-center shadow-2xl p-6 rounded-md text-center w-48 transform transition-transform duration-300 hover:scale-105 fade-in bg-white border border-black">
                        <img
                            src="https://www.svgrepo.com/show/525987/link-square.svg"
                            alt="Feature 1"
                            className="mb-4 mx-auto w-12 h-12"
                        />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Custom Url
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Create custom short URLs and monitor their performance to understand user behavior and engagement.
                        </p>
                    </div>
                    <div className="flex flex-col items-center shadow-2xl p-6 rounded-md text-center w-48 transform transition-transform duration-300 hover:scale-105 fade-in bg-white border border-black">
                        <img
                            src="https://www.svgrepo.com/show/525987/link-square.svg"
                            alt="Feature 1"
                            className="mb-4 mx-auto w-12 h-12"
                        />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Qr Code
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Generate QR codes for easy access and track scans to see their impact on visits and engagement.
                        </p>
                    </div>
                    <div className="flex flex-col items-center shadow-2xl p-6 rounded-md text-center w-48 transform transition-transform duration-300 hover:scale-105 fade-in bg-white border border-black">
                        <img
                            src="https://www.svgrepo.com/show/525987/link-square.svg"
                            alt="Feature 1"
                            className="mb-4 mx-auto w-12 h-12"
                        />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Analytics
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Track link clicks and see how they drive website visits, conversions, and engagement.
                        </p>
                    </div>
                </div>
            </section>
            <CallToAction />
        </main>
    );
};

export default Main;