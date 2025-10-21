"use client";

import { useCallback, useEffect, useState } from "react";
import { db } from "@/lib/indexeddb";
import { IUser, UserSignInData } from "@/@types";
import { ISession } from "@/@types/interfaces/session";
import { toast } from "sonner";
import { sleep } from "@/utils/sleep";
import { UserNotFoundError } from "@/errors";

export const useAuth = () => {
    const [user, setUser] = useState<UserSignInData | null>(null);
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

            debugger;

            const sessionObj: ISession = { key: email, email };
            await db.put("session", sessionObj);

            setUser(foundUser);
            toast.success("Signed in successfully.");
            return foundUser;
        } catch (err: UserNotFoundError | unknown) {
            let errorMessage = "Failed to sign in";

            if (err instanceof UserNotFoundError) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            await sleep(1000);

            const sessions = await getAllSessions();

            await Promise.all(sessions.map((s) => db.delete("session", s.key)));

            setUser(null);
            toast.success("Signed out successfully.");
        } catch (err: unknown) {
            const errorMessage = "Failed to sign out.";
            toast.error(errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAllSessions]);

    useEffect(() => {
        loadSessionUser();
    }, [loadSessionUser]);

    const isAuthenticated = !!user;

    console.log("useAuth - user:", user);
    console.log("isAuthenticated:", isAuthenticated);

    return {
        user,
        loading,
        error,
        isAuthenticated,
        signIn,
        signOut,
        refreshSession: loadSessionUser,
    };
};
