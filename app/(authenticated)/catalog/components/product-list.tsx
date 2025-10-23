import React from "react";
import Product from "./product";
import { productsMock } from "@/mocks";

const ProductList: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            {productsMock.map((product) => (
                <Product product={product} key={product.id} />
            ))}
        </div>
    );
};

export default ProductList;
