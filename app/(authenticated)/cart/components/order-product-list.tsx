"use client";

import React from "react";
import Product from "../../../../components/shared/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { redirect } from "next/navigation";
import { PathRoutes } from "@/@types";

const OrderProductList: React.FC = () => {
    const { items } = useCart();

    const onContinue = () => {
        redirect(PathRoutes.CHECKOUT);
    };

    return (
        <div className="flex flex-col gap-4 min-w-full">
            {items.map((product) => (
                <Product product={product} key={product.id} readOnly />
            ))}

            <Button className="cursor-pointer" onClick={onContinue}>
                Continuar
            </Button>
        </div>
    );
};

export default OrderProductList;
