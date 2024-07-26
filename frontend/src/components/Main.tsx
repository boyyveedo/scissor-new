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
                <h3 className="title pb-2">Explore Scissor</h3>
                <p className="subtitle pb2">Scissor reliably creates custom URLs, QR codes, and provides advanced analytics to track click performance.</p>
                <div className="flex justify-around flex-wrap">
                    <div className="flex flex-col items-center p-2 shadow-md rounded-md text-center w-48">
                        <img
                            src="https://www.svgrepo.com/show/525987/link-square.svg"
                            alt="Feature 1"
                            className="mb-4 mx-auto w-12 h-12"
                        />
                        <h3 className="text-lg">Custom Url</h3>
                        <p>Create custom short URLs and monitor their performance to understand user behavior and engagement.</p>
                    </div>
                    <div className="flex flex-col items-center p-2 shadow-md rounded-md text-center w-48">
                        <img
                            src="https://www.svgrepo.com/show/115934/qr-codes.svg"
                            alt="Qr Code"
                            className="mb-4 mx-auto w-12 h-12"
                        />
                        <h3 className="text-lg">Qr Code</h3>
                        <p> Generate QR codes for easy access and track scans to see their impact on visits and engagement.</p>
                    </div>
                    <div className="flex flex-col items-center p-2 shadow-md rounded-md text-center w-48">
                        <img
                            src="https://www.svgrepo.com/show/501443/analytics.svg"
                            alt="Analytics"
                            className="mb-4 mx-auto w-12 h-12"
                        />
                        <h3 className="text-lg">Analytics</h3>
                        <p>Track link clicks and see how they drive website visits, conversions, and engagement.</p>
                    </div>
                </div>
            </section>
            <CallToAction />
        </main>
    );
};

export default Main;