"use client";

import { PathRoutes } from "@/@types";
import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAuth();

    // fala gugaaaa

    useEffect(() => {
        if (isAuthenticated && !loading) {
            redirect(PathRoutes.CATALOG);
        }
    }, [isAuthenticated, loading]);

    return <>{children}</>;
}
