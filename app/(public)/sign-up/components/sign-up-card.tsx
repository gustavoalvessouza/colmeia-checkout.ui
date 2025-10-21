"use client";

import { PathRoutes, UserSignUpData } from "@/@types";
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
import Image from "next/image";

import { redirect } from "next/navigation";
import { useSignUp } from "../hooks/use-sign-up";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/hooks";
import { useEffect } from "react";

export function SignUpCard() {
    const { signIn, isAuthenticated } = useAuth();
    const { signUp, loading } = useSignUp();
    const { register, handleSubmit, reset } = useForm<UserSignUpData>();

    const onSubmit = async (data: UserSignUpData) => {
        try {
            await signUp(data);

            const user = { email: data.email, password: data.password };
            await signIn(user);

            toast.success("Account created successfully!");

            console.log("Redirecting to catalog...");
            reset();
            redirect(PathRoutes.CATALOG);
        } catch (error: unknown) {
            toast.error("Failed to create account. Please try again.");
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
                />
                <CardDescription className="text-center">
                    Create a new account to enjoy all features!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                autoFocus
                                required
                                {...register("name")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="colmeia@example.com"
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
                            Sign Up
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            onClick={() => redirect(PathRoutes.SIGN_IN)}
                        >
                            I already have an account
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
