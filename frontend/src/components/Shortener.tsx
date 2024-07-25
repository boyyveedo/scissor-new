import React, { useState, ChangeEvent, MouseEvent } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const apiUrl = process.env.REACT_APP_SERVER_ENDPOINT;

interface Link {
    url: string;
    shortUrl: string;
}

interface ShortenerProps {
    addLink: (newItem: Link) => void;
}

const Shortener: React.FC<ShortenerProps> = (props) => {
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (input === '') return;

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/`, {
                method: 'POST',
                body: JSON.stringify({ url: input }),
                headers: {
                    'Content-type': 'application/json',
                },
            });

            if (response.status === 404) {
                alert('Unable to reach server');
                setInput('');
                setLoading(false);
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                setInput('');
                setLoading(false);
                return;
            }

            const newItem: Link = {
                url: input,
                shortUrl: data.shortUrl,
            };

            props.addLink(newItem);
            setInput('');
            setLoading(false);
        } catch (err) {
            alert('Server Error');
            setInput('');
            setLoading(false);
        }
    };

    const override = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div className="shortener rounded-lg">
            <form>
                <div className="input-area">
                    <input
                        type="url"
                        placeholder="Shorten a link here..."
                        id="input"
                        onChange={handleInputChange}
                        value={input}
                    />
                    <p className="warning">Please add a link</p>
                </div>
                <button
                    className="btn-cta"
                    type="button"
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? (
                        <PulseLoader
                            color={'white'}
                            cssOverride={override}
                            size={11}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        'Shorten it!'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Shortener;

// Add an empty export statement to ensure the file is treated as a module
export { };