"use client";

import { PathRoutes, type UserSignInData } from "@/@types";
import { AppImages } from "@/assets";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignInCard() {
    const { signIn, loading, isAuthenticated } = useAuth();
    const { register, handleSubmit, reset } = useForm<UserSignInData>();
    const router = useRouter();

    const onSubmit = async (data: UserSignInData) => {
        try {
            await signIn(data);
            toast.success("Successfully signed in!");
            reset();
            redirect(PathRoutes.CATALOG);
        } catch (error: unknown) {
            toast.error("Failed to log in. Please try again.");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            redirect(PathRoutes.CATALOG);
        }
    }, [isAuthenticated]);

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <Image
                    src={AppImages.colmeiaLogo}
                    alt="Colmeia Logo"
                    className="w-42 my-4 mx-auto"
                    priority
                />
                <CardDescription className="text-center">
                    Enter your data to create a new account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="colmeia@example.com"
                                autoFocus
                                required
                                {...register("email")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                required
                                {...register("password")}
                            />
                        </div>
                    </div>

                    <CardFooter className="flex-col gap-2 mt-4">
                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Login"}
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            onClick={() => router.push(PathRoutes.SIGN_UP)}
                        >
                            Create a new account
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
