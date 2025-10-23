"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { sleep } from "@/utils/sleep";
import Image from "next/image";
import { AppImages } from "@/assets";
import { Button } from "@/components/ui/button";

import { PathRoutes } from "@/@types";
import { redirect } from "next/navigation";

interface ProcessOrderProps {
    className?: string;
}

const ProcessOrder: React.FC<ProcessOrderProps> = ({ className }) => {
    const [title, setTitle] = React.useState<string>(
        "Processando sua pagamento..."
    );
    const [description, setDescription] = React.useState<string>(
        "Aguarde enquanto validamos as informações. Isso pode levar alguns segundos."
    );
    const [success, setSuccess] = React.useState(false);

    React.useEffect(() => {
        async function process() {
            await sleep(3000);
            setTitle("Confirmandando pedido com o estabelecimento");
            await sleep(3000);
            setTitle("Pagamento confirmado!");
            setDescription("Acompanhe seu pedido na tela inicial.");
            setSuccess(true);
        }
        process();
    }, []);

    const onBack = () => {
        redirect(PathRoutes.CATALOG);
    };

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center p-8 rounded-lg text-white min-h-[500px]",
                className
            )}
        >
            <div className="flex items-center justify-center mb-4">
                {success ? (
                    <Image
                        src={AppImages.successOrder}
                        width={300}
                        height={300}
                        alt="Successfully order!"
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

            <Button
                className="mt-6 bg-zinc-500 cursor-pointer"
                onClick={onBack}
            >
                Voltar ao inicio
            </Button>
        </div>
    );
};

export default ProcessOrder;
