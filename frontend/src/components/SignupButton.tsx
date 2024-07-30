// src/components/SignUpButton.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton: React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return null;
    }

    return (
        <button onClick={() => loginWithRedirect()}>
            Get started
        </button>
    );
};

export default SignUpButton;
