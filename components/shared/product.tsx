import React from "react";
import { IncrementalInput } from "../../app/(authenticated)/catalog/components/incremental-input";
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
    readOnly?: boolean;
}

const Product: React.FC<ProductProps> = ({ product, readOnly = false }) => {
    return (
        <Item variant="outline" className="">
            <Image
                src={product.image}
                alt={product.title}
                width="100"
                height="100"
                className="rounded-md w-full md:w-auto"
            />
            <ItemContent className="flex flex-col">
                <ItemTitle>{product.title}</ItemTitle>
                <ItemDescription>
                    {formatCurrency(product.price)}
                </ItemDescription>
            </ItemContent>
            {!readOnly && (
                <ItemActions>
                    <IncrementalInput product={product} />
                </ItemActions>
            )}
        </Item>
    );
};

export default Product;
