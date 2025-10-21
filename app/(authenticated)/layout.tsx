"use client";

import { PathRoutes } from "@/@types";
import { AppImages } from "@/assets";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading, signOut } = useAuth();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            redirect(PathRoutes.SIGN_IN);
        }
    }, [isAuthenticated, loading]);

    const onSignOut = async () => {
        await signOut();
        redirect(PathRoutes.SIGN_IN);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow-sm flex justify-around items-center">
                <div className="p-4">
                    <Image
                        src={AppImages.colmeiaLogo}
                        className="w-44"
                        alt="Colmeia Logo"
                    />
                </div>
                <div>
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={onSignOut}
                    >
                        Sign Out
                    </Button>
                </div>
            </header>
            <main className="flex-1 max-w-7xl mx-auto p-4">{children}</main>
        </div>
    );
}
