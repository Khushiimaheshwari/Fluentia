import React, { useState } from "react";
import Hero from './Hero';
import useSignUp from "../../hooks/useSignUp";

function Signup() {
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { isPending, error, signupMutation } = useSignUp()

    const handleSignup = (e) => {
        e.preventDefault();
        signupMutation(signupData);
    }

    return (
        <>
            <Hero
                signupData={signupData}
                setSignupData={setSignupData}
                handleSignup={handleSignup}
                isPending={isPending}
                error={error}
            />

        </>
    );
}
export default Signup;