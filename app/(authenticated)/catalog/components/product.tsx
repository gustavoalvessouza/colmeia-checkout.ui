import React from "react";
import { IncrementalInput } from "./incremental-input";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item";
import { IProduct } from "@/@types";
import Image from "next/image";
import { formatCurrency } from "@/utils/format-curreny";

interface ProductProps {
    product: IProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <Item variant="outline">
            <Image
                src={product.image}
                alt={product.title}
                width="100"
                height="100"
                className="rounded-md"
            />
            <ItemContent>
                <ItemTitle>{product.title}</ItemTitle>
                <ItemDescription>
                    {formatCurrency(product.price)}
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <IncrementalInput product={product} />
            </ItemActions>
        </Item>
    );
};

export default Product;
