import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    if (isAuthenticated) {
        return null;
    }

    return (
        <div>
            <div>
                <button onClick={() => loginWithRedirect()}>
                    Log In
                </button>

                <h3>User is {isAuthenticated ? 'Loggedin' : 'Not Logged In'} </h3>
                {isAuthenticated && (
                    <pre style={{ textAlign: 'start' }}>
                        {JSON.stringify(user, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
};

export default LoginButton;
