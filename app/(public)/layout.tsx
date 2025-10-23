"use client";

import { PathRoutes } from "@/@types";
import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";
import React from "react";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAuth();

    if (isAuthenticated && !loading) {
        return redirect(PathRoutes.CATALOG);
    }

    return <>{children}</>;
}
