"use client";

import { PathRoutes } from "@/@types";
import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";

export default function Home() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return redirect(PathRoutes.CATALOG);
    } else {
        return redirect(PathRoutes.SIGN_IN);
    }
}
