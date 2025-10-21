"use client";

import React, { useEffect } from "react";
import { SignInCard } from "./components/sign-in-card";
import { useAuth } from "@/hooks";

import { PathRoutes } from "@/@types";
import { redirect } from "next/navigation";

const Sign: React.FC = () => {
    return (
        <div className="grid place-items-center min-h-screen">
            <SignInCard />
        </div>
    );
};

export default Sign;
