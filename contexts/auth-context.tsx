"use client";

import { type IUser, type UserSignInData } from "@/@types";
import { ISession } from "@/@types/interfaces/session.interface";
import { UserNotFoundError } from "@/errors";
import { db } from "@/lib/indexeddb";
import { sleep } from "@/utils/sleep";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

export type AuthContextValues = {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    signIn: (data: UserSignInData) => Promise<void>;
    signOut: () => Promise<void>;
    loadSessionUser: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextValues | undefined>(
    undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getAllSessions = useCallback(async (): Promise<ISession[]> => {
        try {
            const sessions = (await db.getAll("session")) || [];
            return sessions as ISession[];
        } catch (err) {
            toast.error("Failed to load active sessions.");
            return [];
        }
    }, []);

    const getAllUsers = useCallback(async (): Promise<IUser[]> => {
        try {
            const users = (await db.getAll("users")) || [];
            return users as IUser[];
        } catch (err) {
            toast.error("Failed to load users.");
            return [];
        }
    }, []);

    const loadSessionUser = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const sessions = await getAllSessions();

            if (!sessions?.length) {
                setUser(null);
                setLoading(false);
                return;
            }

            const [session] = sessions;

            const allUsers = await getAllUsers();
            const foundUser =
                allUsers.find((u) => u.email === session.email) || null;

            setUser(foundUser);
        } catch (err: unknown) {
            const errorMessage = "Failed to load session user.";
            toast.error(errorMessage);
            setError(errorMessage);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [getAllSessions]);

    const signIn = useCallback(async (data: UserSignInData) => {
        setLoading(true);
        setError(null);

        try {
            await sleep(1000);

            const { email, password } = data;

            const allUsers = (await db.getAll("users")) || [];
            const foundUser = (allUsers as IUser[]).find(
                (u) => u.email === email && u.password === password
            );

            if (!foundUser) {
                throw new UserNotFoundError();
            }

            setUser(foundUser);
            setLoading(false);

            const sessionObj: ISession = { key: email, email };
            await db.put("session", sessionObj);
        } catch (err: UserNotFoundError | unknown) {
            let errorMessage = "Failed to sign in";

            if (err instanceof UserNotFoundError) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage);
            setLoading(false);
            throw err;
        }
    }, []);

    const signOut = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            if (!user) {
                return;
            }

            const key = user.email;

            setUser(null);
            setLoading(false);

            toast.success("Signed out successfully.");
            await db.delete("session", key);
        } catch (err: unknown) {
            const errorMessage = "Failed to sign out.";
            toast.error(errorMessage);
            setError(errorMessage);
            setLoading(false);
            throw err;
        }
    }, [user]);

    React.useEffect(() => {
        loadSessionUser();
    }, [loadSessionUser]);

    const isAuthenticated = !!user;

    const values: AuthContextValues = {
        user,
        loading,
        error,
        isAuthenticated,
        signIn,
        signOut,
        loadSessionUser,
    };
    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
