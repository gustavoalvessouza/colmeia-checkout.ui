"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/utils/format-curreny";
import React, { useState } from "react";
import PaymentMethodSelector from "./components/payment-method-selector";
import { PathRoutes, Payment } from "@/@types";
import PaymentMethodForm from "./components/payment-method-form";
import { redirect } from "next/navigation";
import { sleep } from "@/utils/sleep";

const Checkout: React.FC = () => {
    const { totalPrice } = useCart();
    const [loading, setLoading] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<Payment.Method>(
        Payment.Method.PIX
    );

    const onConfirm = async () => {
        setLoading(true);
        await sleep(1500);
        redirect(PathRoutes.PROCESS_ORDER);
    };

    return (
        <div className="flex flex-col gap-4 max-w-4/5 mx-auto">
            <h1 className="font-bold text-2xl">Forma de Pagamento</h1>

            <div className="flex w-full justify-between border-b border-zinc-200 border-dashed pb-2">
                <h2 className="font-semibold">Total</h2>
                <span className="font-semibold">
                    {formatCurrency(totalPrice)}
                </span>
            </div>

            <PaymentMethodSelector
                defaultValue={paymentMethod}
                onValueChange={setPaymentMethod}
            />

            <PaymentMethodForm paymentMethod={paymentMethod} />

            <Button
                className="cursor-pointer"
                onClick={onConfirm}
                disabled={loading}
            >
                Confirmar
            </Button>
        </div>
    );
};

export default Checkout;
