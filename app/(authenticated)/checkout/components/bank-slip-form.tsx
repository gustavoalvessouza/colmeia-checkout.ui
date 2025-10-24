import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks";

const BankSlipForm: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="w-full grid place-items-center">
            <Card className="w-full max-w-sm">
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Nome Completo</Label>
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
                                    id="cpf"
                                    type="text"
                                    placeholder="999.999.999-99"
                                    autoFocus
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

export default BankSlipForm;
