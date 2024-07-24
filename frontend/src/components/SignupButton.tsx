// src/components/SignUpButton.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton: React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return null;
    }

    return (
        <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
            Sign Up
        </button>
    );
};

export default SignUpButton;
