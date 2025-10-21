"use client";

import { useState, useCallback } from "react";
import { db } from "@/lib/indexeddb";
import { UserSignUpData } from "@/@types";
import { sleep } from "@/utils/sleep";
import { toast } from "sonner";

export function useSignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signUp = useCallback(async (data: UserSignUpData) => {
        setLoading(true);
        setError(null);

        try {
            await sleep(1500);

            const users = (await db.getAll("users")) || [];
            const userExists = users.find((u) => u.email === data.email);

            if (userExists) {
                toast.error("Email already registered!");
                throw new Error("Email already registered");
            }

            const id = await db.add<UserSignUpData>("users", data);
            const createdUser = await db.get("users", id);

            // await db.put("session", {
            //     key: "currentUser",
            //     value: createdUser?.id,
            // });

            return createdUser;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { signUp, loading, error };
}
