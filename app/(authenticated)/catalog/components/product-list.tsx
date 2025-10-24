import React from "react";
import Product from "../../../../components/shared/product";
import { productsMock } from "@/mocks";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { redirect } from "next/navigation";
import { PathRoutes } from "@/@types";

const ProductList: React.FC = () => {
    const { items } = useCart();

    const onContinue = () => {
        redirect(PathRoutes.CART);
    };

    const isContinueDisabled = !items.length;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Faça seu pedido</h1>

            {productsMock.map((product) => (
                <Product product={product} key={product.id} />
            ))}

            <Button
                className="cursor-pointer"
                onClick={onContinue}
                disabled={isContinueDisabled}
            >
                Continuar
            </Button>
        </div>
    );
};

export default ProductList;
