"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Payment } from "@/@types";

interface PaymentMethod {
    id: string;
    name: string;
    description: string;
    icon?: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
    {
        id: Payment.Method.PIX,
        name: "Pix",
        description: "Pagamento instantâneo via QR Code.",
    },
    {
        id: Payment.Method.CARD,
        name: "Cartão de Crédito",
        description: "Pague em até 12x. Sujeito à aprovação.",
    },
    {
        id: Payment.Method.BOLETO,
        name: "Boleto Bancário",
        description: "O prazo de compensação pode levar até 3 dias úteis.",
    },
];

interface PaymentMethodSelectorProps {
    onValueChange: (value: Payment.Method) => void;
    defaultValue: Payment.Method;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
    onValueChange,
    defaultValue,
}) => {
    return (
        <RadioGroup
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            className="space-y-4 flex flex-col md:flex-row"
        >
            {paymentMethods.map((method) => (
                <div key={method.id}>
                    <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="sr-only w-80 h-80"
                    />

                    <Label
                        htmlFor={method.id}
                        className={cn(
                            "flex flex-col items-start space-y-2 p-4 border rounded-lg shadow-sm transition-all duration-200 cursor-pointer",
                            "hover:bg-accent hover:text-accent-foreground",
                            "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                            "has-[.sr-only:checked]:border-primary has-[.sr-only:checked]:bg-primary/5"
                        )}
                    >
                        <div className="flex w-full justify-between items-center">
                            <h3 className="font-semibold text-base">
                                {method.name}
                            </h3>

                            <div
                                className={cn(
                                    "h-4 w-4 rounded-full border-2",
                                    method.id === defaultValue
                                        ? "border-primary bg-primary flex items-center justify-center"
                                        : "border-input bg-background"
                                )}
                            >
                                {method.id === defaultValue && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                )}
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {method.description}
                        </p>

                        <RadioGroupItem
                            value={method.id}
                            id={method.id}
                            className="sr-only"
                        />
                    </Label>
                </div>
            ))}
        </RadioGroup>
    );
};

export default PaymentMethodSelector;
