"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { sleep } from "@/utils/sleep";
import Image from "next/image";
import { AppImages } from "@/assets";
import { Button } from "@/components/ui/button";

import { PathRoutes } from "@/@types";
import { redirect } from "next/navigation";
import { useCart } from "@/contexts/cart-context";

interface ProcessOrderProps {
    className?: string;
}

const initialValues = {
    title: "Processando seu pagamento...",
    description:
        "Aguarde enquanto validamos as informações. Isso pode levar alguns segundos.",
};

const ProcessOrder: React.FC<ProcessOrderProps> = ({ className }) => {
    const { clearItems } = useCart();

    const [title, setTitle] = React.useState<string>(initialValues.title);
    const [description, setDescription] = React.useState<string>(
        initialValues.description
    );
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const process = async () => {
        setError(false);
        setSuccess(false);
        setTitle(initialValues.title);
        setDescription(initialValues.description);
        await sleep(3000);
        setTitle("Confirmando pedido com o estabelecimento");
        await sleep(3000);
    };

    const onSuccess = async () => {
        await process();
        setTitle("Pagamento confirmado!");
        setDescription("Acompanhe seu pedido na tela inicial.");
        setSuccess(true);
        setError(false);
    };

    const onError = async () => {
        await process();
        setTitle("Algo de errado aconteceu!");
        setDescription("Tente novamente clicando no botão abaixo.");
        setError(true);
        setSuccess(false);
    };

    React.useEffect(() => {
        onError();
    }, []);

    const onBack = () => {
        clearItems();
        redirect(PathRoutes.CATALOG);
    };

    const button = {
        text: success ? " Voltar ao inicio" : "Tentar novamente",
        cb: success ? onBack : onSuccess,
    };

    const image = success ? AppImages.successOrder : AppImages.errorOrder;

    const isPaymentProcessed = success || error;

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center p-8 rounded-lg text-white min-h-[500px]",
                className
            )}
        >
            <div className="flex items-center justify-center mb-4">
                {isPaymentProcessed ? (
                    <Image
                        src={image}
                        width={300}
                        height={300}
                        alt="Payment Process Status Image"
                    />
                ) : (
                    <div
                        className={cn(
                            "animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-white"
                        )}
                    />
                )}
            </div>

            <h3
                className={cn(
                    "text-3xl font-bold mt-4 text-center",
                    success ? "text-green-600" : "text-zinc-600"
                )}
            >
                {title}
            </h3>

            <p className="text-md text-zinc-400 mt-2 text-center max-w-sm">
                {description}
            </p>

            {isPaymentProcessed && (
                <Button
                    className="mt-6 bg-zinc-500 cursor-pointer"
                    onClick={button.cb}
                >
                    {button.text}
                </Button>
            )}
        </div>
    );
};

export default ProcessOrder;
