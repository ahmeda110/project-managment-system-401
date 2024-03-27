import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import '../../assets/styles/Login.css';

function Login() {
    const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user);
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {!isLoading && (
                <div className="homepage">
                    {isAuthenticated ? (
                        <div>
                            Loading...
                        </div>
                    ) : (
                        <div className="login-section">
                            <header>
                                <h1>Welcome to Project Manager</h1>
                            </header>
                            <main>
                                <div className="login-item" onClick={loginWithRedirect}>
                                    <FaSignInAlt size={20} />
                                    <span className="login-text">Login</span>
                                </div>
                            </main>
                        </div>
                    )}
                </div>
            )}
        </Suspense>
    );
}

export default Login;
