import React from 'react';

// Define the type for each URL object
interface Url {
    url: string;
    shortUrl: string;
}

// Define the type for the props
interface UrlListProps {
    urlList: Url[];
}

const UrlList: React.FC<UrlListProps> = (props) => {
    const { urlList } = props;

    return (
        <ul className="list grid grid-cols-1 gap-5">
            {urlList.map((element, index) => (
                <li className="list-item" key={index} id={index.toString()}>
                    <div className="links">
                        <a href={element.url} className="full-url">
                            {element.url.slice(0, 100)}
                        </a>
                        <a href={element.shortUrl} className="short-url font-medium">
                            {element.shortUrl}
                        </a>
                    </div>
                    <button
                        type="button"
                        className="btn-cta btn-copy"
                        onClick={() => navigator.clipboard.writeText(element.shortUrl)}
                    >
                        Copy
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default UrlList;
