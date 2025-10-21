"use client";

import { useAuth } from "@/hooks";
import React from "react";

const Catalog: React.FC = () => {
    const { user } = useAuth();
    return <>Catalog {user?.email}</>;
};

export default Catalog;
