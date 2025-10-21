import React from "react";
import { SignUpCard } from "./components/sign-up-card";

const SignUp: React.FC = () => {
    return (
        <div className="grid place-items-center min-h-screen">
            <SignUpCard />
        </div>
    );
};

export default SignUp;
