"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks";

const CreditCardForm: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="w-full grid place-items-center">
            <Card className="w-full max-w-sm">
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Titular</Label>
                                <Input
                                    id="owner"
                                    type="text"
                                    placeholder="Joe Due"
                                    defaultValue={user?.name}
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Número do Cartão</Label>
                                <Input
                                    id="card-number"
                                    type="text"
                                    placeholder="3453.345345.3453453"
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">CVV</Label>
                                <Input
                                    id="cvv"
                                    type="text"
                                    placeholder="999"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Validade</Label>
                                <Input
                                    id="due-date"
                                    type="text"
                                    placeholder="09/27"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreditCardForm;
