"use client";

import React from "react";
import OrderProductList from "./components/order-product-list";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/utils/format-curreny";

const Cart: React.FC = () => {
    const { items } = useCart();

    const total = items
        .map((i) => i.price * i.quantity)
        .reduce((acc, value) => acc + value);

    return (
        <div className="min-w-full flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Resumo do Pedido</h1>

            {items.map((i) => {
                const productPrice = i.price * i.quantity;
                return (
                    <div className="flex w-full justify-between" key={i.id}>
                        <h2 className="font-medium text-zinc-500">{i.title}</h2>
                        <span className="text-zinc-500">
                            {formatCurrency(productPrice)}
                        </span>
                    </div>
                );
            })}

            <div className="flex w-full justify-between border-t border-zinc-200 border-dashed pt-2">
                <h2 className="font-semibold">Sub total</h2>
                <span className="font-semibold">{formatCurrency(total)}</span>
            </div>
            <OrderProductList />
        </div>
    );
};

export default Cart;
