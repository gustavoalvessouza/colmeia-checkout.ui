"use client";

import { PathRoutes } from "@/@types";
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

export function SignUpCard() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <Image
                    src={AppImages.colmeiaLogo}
                    alt="Colmeia Logo"
                    className="w-42 my-4 mx-auto"
                />
                <CardDescription className="text-center">
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="colmeia@example.com"
                                autoFocus
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full cursor-pointer">
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
        </Card>
    );
}
