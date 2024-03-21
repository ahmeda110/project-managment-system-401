import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            // Redirect to /dashboard once user is authenticated
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="Login">
            <h1>Auth0 authentication</h1>
            <ul>
                <li>
                    <button onClick={loginWithPopup}>Login with Popup</button>
                </li>
                <li>
                    <button onClick={loginWithRedirect}>Login with Redirect</button>
                </li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
            <h3>User is {isAuthenticated ? 'Logged in' : 'Not logged in'}</h3>
            {isAuthenticated && (
                <pre style={{ textAlign: 'start'}}>
                    {JSON.stringify(user, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default Login;
