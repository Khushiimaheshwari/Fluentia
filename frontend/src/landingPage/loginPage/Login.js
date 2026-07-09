import React, { useState } from 'react';
import Hero from './Hero';
import useLogin from '../../hooks/useLogin';

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const { isPending, error, loginMutation } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation(loginData);
    }

    return (
        <>
            <Hero
                loginData={loginData}
                setLoginData={setLoginData}
                handleLogin={handleLogin}
                isPending={isPending}
                error={error}
            />

        </>
    );
}
export default Login;