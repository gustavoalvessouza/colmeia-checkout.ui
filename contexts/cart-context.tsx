"use client";

import { IProduct } from "@/@types";
import React, { createContext, useContext, useState, useCallback } from "react";

interface CartContextValue {
    items: CartProduct[];
    increment: (product: IProduct) => void;
    decrement: (product: IProduct) => void;
    totalItems: number;
    totalPrice: number;
    productQuantity: (product: IProduct) => number;
}

type CartProduct = IProduct & { quantity: number };

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [items, setItems] = useState<CartProduct[]>([]);

    console.log("items", items);

    const increment = useCallback((product: IProduct) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const decrement = useCallback((product: IProduct) => {
        setItems((prev) =>
            prev
                .map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
                )
                .filter((p) => p.quantity > 0)
        );
    }, []);

    const productQuantity = (product: IProduct) => {
        return items?.find((p) => p.id === product.id)?.quantity || 0;
    };

    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
    const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                increment,
                decrement,
                totalItems,
                totalPrice,
                productQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
}
