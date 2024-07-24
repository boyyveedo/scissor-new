

declare module 'react-spinners/PulseLoader' {
    import * as React from 'react';

    interface LoaderProps {
        loading?: boolean;
        color?: string;
        cssOverride?: React.CSSProperties;
        size?: number | string;
        margin?: number | string;
        speedMultiplier?: number;
        ariaLabel?: string;
    }

    const PulseLoader: React.FC<LoaderProps>;
    export default PulseLoader;
}
